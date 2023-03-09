import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react'
import { ChakraProvider } from '@chakra-ui/react'
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ChakraProvider>
			<Auth0Provider
				domain={import.meta.env.VITE_AUTH_DOMAIN}
				clientId={import.meta.env.VITE_AUTH_CLIENT_ID}
				authorizationParams={{
					redirect_uri: `${window.location.origin}/game`,
					//audience: 'https://easy-rpg-backend.herokuapp.com/',
					//scope: 'read:current_user update:current_user_metadata',
				}}
			>
				<App />
			</Auth0Provider>
		</ChakraProvider>
	</React.StrictMode>
)
