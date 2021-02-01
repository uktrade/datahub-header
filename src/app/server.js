const http = require( 'http' );
const fs = require( 'fs' );
const path = require( 'path' );
const url = require( 'url' );
const nunjucks = require( 'nunjucks' );

const PORT = ( process.env.PORT || 3000 );

const CRM = 'datahub-crm';
const MARKET_ACCESS = 'market-access';
const EXPORTERS = 'find-exporters';

nunjucks.configure( {
	noCache: true,
} );

const server = http.createServer( ( req, res ) => {

	const { pathname, query } = url.parse( req.url, true );

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

	function renderTemplate( template, appKeys = [], availableApps ){

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
					text: 'Only Exporters',
					href: '/find-exporters/',
					active: !!opts.exporters
				},{
					text: 'Only MA',
					href: '/market-access/',
					active: !!opts.ma
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
			},
			availableApps,
			active: query.active || 'datahub-companies'
		} ) );
	}

	switch( pathname ){

		case '/':
			renderTemplate( 'all.njk', [ CRM, MARKET_ACCESS, EXPORTERS ] );
			break;

		case '/crm/':
			renderTemplate( 'crm.njk', [ CRM ], ( query.apps && query.apps.split( ',' ) ) );
			break;

		case '/find-exporters/':
			renderTemplate( 'find-exporters.njk', [ EXPORTERS ] );
			break;

		case '/market-access/':
			renderTemplate( 'market-access.njk', [ MARKET_ACCESS ] );
			break;

		case '/no-user/':
			renderTemplate( 'no-user.njk', [ CRM, EXPORTERS ] );
			break;

		case '/no-subnav/':
			renderTemplate( 'no-subnav.njk', [ CRM ] );
			break;

		case '/fixed-width/':
			renderTemplate( 'fixed-width.njk', [ CRM ] );
			break;

		case '/support':
			renderTemplate( 'support.njk', [ CRM ] );
			break;

		case '/profile':
			renderTemplate( 'profile.njk', [ CRM ] );
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
