import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react'

import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Auth0Provider
			domain={import.meta.env.VITE_AUTH_DOMAIN}
			clientId={import.meta.env.VITE_AUTH_CLIENT_ID}
			authorizationParams={{
				redirect_uri: `${window.location.origin}/game`,
			}}
		>
			<App />
		</Auth0Provider>
	</React.StrictMode>
)
