const http = require( 'http' );
const fs = require( 'fs' );
const path = require( 'path' );
const nunjucks = require( 'nunjucks' );

const PORT = ( process.env.PORT || 3000 );

const CRM = 'datahub-crm';
const MI = 'datahub-mi';
const MARKET_ACCESS = 'market-access';
const EXPORTERS = 'find-exporters';

nunjucks.configure( {
	noCache: true,
} );

const server = http.createServer( ( req, res ) => {

	function returnFile( contentType, file ){

		fs.readFile( path.resolve( __dirname, file ), ( err, data ) => {

			if( err ){

				res.writeHead( 500 );
				res.end();
				console.error( err );

			} else {

				res.writeHead( 200, { 'Content-Type': contentType } );
				res.end( data );
			}
		} );
	}

	function renderTemplate( template, appKeys = [] ){

		res.writeHead( 200, { 'Content-Type': 'text/html' } );
			res.end( nunjucks.render( `src/app/templates/${ template }`, {
				createSubnav: ( opts = {} ) => [
					{
						text: 'All apps',
						href: '/',
						active: !!opts.all
					},{
						text: 'Only CRM',
						href: '/crm/',
						active: !!opts.crm
					},{
						text: 'Only MI',
						href: '/mi/',
						active: !!opts.mi
					},{
						text: 'Only Exporters',
						href: '/find-exporters/',
						active: !!opts.exporters
					},{
						text: 'No user',
						href: '/no-user/',
						active: !!opts.user
					},{
						text: 'Fixed width',
						href: '/fixed-width/',
						active: !!opts.fixed
					},{
						text: 'No subnav',
						href: '/no-subnav/',
						active: false
					}
				],
				user: {
					name: 'Test User',
					permitted_applications: appKeys.map( ( key ) => ({ key }) ),
				}
			} ) );
	}

	switch( req.url ){

		case '/':

			renderTemplate( 'all.njk', [ CRM, MI, MARKET_ACCESS, EXPORTERS ] );

		break;
		case '/crm/':

			renderTemplate( 'crm.njk', [ CRM ] );

		break;
		case '/mi/':

			renderTemplate( 'mi.njk', [ MI ] );

		break;
		case '/find-exporters/':

			renderTemplate( 'find-exporters.njk', [ EXPORTERS ] );

		break;
		case '/no-user/':

			renderTemplate( 'no-user.njk', [ CRM, EXPORTERS ] );

		break;
		case '/no-subnav/':

			renderTemplate( 'no-subnav.njk', [ CRM, MI ] );

		break;
		case '/fixed-width/':

			renderTemplate( 'fixed-width.njk', [ CRM, MI ] );

		break;

		case '/src/app/header.css':

			returnFile( 'text/css', './header.css' );

		break;
		case '/src/component/header.js':

			returnFile( 'application/javascript', '../component/header.js' );

		break;
		default:
			res.writeHead( 404 );
			res.end();
	}

} );

server.listen( PORT, () => {
	console.log( `Server listening on port ${ PORT }` );
} );
