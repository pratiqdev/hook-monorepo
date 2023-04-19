


// /**
//  * useW3M
//  * 
//  * This is a stateful web3modal controller that returns state
//  * @param config 
//  * @returns state
//  */
//  export const useW3M = (config: ICreateStateConfig) => {
// 	const connectionAbandoned = useRef(false);
// 	const connectionInProgress = useRef(false);
// 	const wasInitialized = useRef(false);
// 	const currentStatus = useRef(ConnectionStatus.NOT_CONNECTED);

// 	const CONSTANTS: any = {
// 		GLOBAL_WEB_3_MODAL: null,
// 		GLOBAL_WEB_3_PROVIDER: null,
// 		PROVIDER: null,
// 		LIBRARY: null,
// 		NETWORK: null,
// 		ADDRESS: null,
// 		CHAIN_ID: null,
// 		CHAIN_NAME: null,
// 		SSKEY_WAS_CONNECTED: "W3M_WAS_CONNECTED",
// 		SSKEY_SHOULD_RECONNECT: "W3M_SHOULD_RECONNECT",
// 		DEFAULT_CONTEXT: {
// 		status: ConnectionStatus.NOT_CONNECTED,
// 		chainId: null,
// 		address: null,
// 		connected: false,
// 		connecting: false,
// 		reconnect: config.reconnect ? config.reconnect : false,
// 		signed: null,
// 		verificationResult: null,
// 		},
// 	};



// 	const [ctx, setCtx] = useState<any>(CONSTANTS.DEFAULT_CONTEXT);

// 	const toggleReconnect = (bool: boolean) => {
// 		if (typeof window !== "undefined" && window.sessionStorage) {
// 		sessionStorage.setItem("W3M_SHOULD_RECONNECT", bool.toString());
// 		setCtx({ ...ctx, reconnect: bool });
// 		}
// 	};

// 	/** Console log an item if func in debug mode */
// 	const debug = (...msg: any) => {
// 		config.debug && console.log('W3M |',...msg);
// 	};
















//   	//+ ///////////////////////////////////////////////////////////////////////
//   	//+ //////////////////////////////////////////////////////////////  FIRE CB

// 	const e = useMemo(()=> new EventEmitter(),[])
// 	const onEvent = (event:string, cb:(...args: any[]) => void) => e.on(event, cb)

// 	const [trigger_onConnecting, emitConnecting] = useState(false);
// 	const [trigger_onConnect, emitConnect] = useState(false);
// 	const [trigger_onDisconnect, emitDisconnect] = useState(false);
// 	const [trigger_accountChange, emitAccountChange] = useState(false);
// 	const [trigger_onNetworkChange, emitNetworkChange] = useState(false);
// 	const [trigger_onVerifying, emitVerifying] = useState(false);
// 	const [trigger_onVerified, emitVerified] = useState(false);
// 	const [trigger_onVerifyFail, emitVerifyFail] = useState(false);
// 	const [trigger_onSigning, emitSigning] = useState(false);
// 	const [trigger_onSigned, emitSigned] = useState(false);
// 	const [trigger_onSignFail, emitSignFail] = useState(false);


// 	useEffect(() => {
// 		if (trigger_onConnect) {
// 			e.emit(EventTypes.CONNECTED);
// 			emitConnect(false);
// 			config.onConnect && config.onConnect(ctx)
// 		}

// 		if (trigger_onDisconnect) {
// 			e.emit(EventTypes.DISCONNECTED);
// 			emitDisconnect(false);
// 			config.onDisconnect && config.onDisconnect(ctx)
// 		}

// 		if (trigger_accountChange) {
// 			e.emit(EventTypes.ACCOUNT_CHANGED);
// 			emitAccountChange(false);
// 			config.onAccountChange && config.onAccountChange(ctx);
// 		}

// 		if (trigger_onNetworkChange) {
// 			e.emit(EventTypes.NETWORK_CHANGED);
// 			emitNetworkChange(false);
// 			config.onNetworkChange && config.onNetworkChange(ctx);
// 		}

// 		if (trigger_onConnecting) {
// 			e.emit(EventTypes.CONNECTING);
// 			emitConnecting(false);
// 			config.onConnecting && config.onConnecting(ctx);
// 		}

// 		if (trigger_onSigning) {
// 			e.emit(EventTypes.SIGNING);
// 			emitSigning(false);
// 			config.onSigning && config.onSigning(ctx);
// 		}

// 		if (trigger_onSigned) {
// 			e.emit(EventTypes.SIGNED);
// 			emitSigned(false);
// 			config.onSigned && config.onSigned(ctx);
// 		}

// 		if (trigger_onSignFail) {
// 			e.emit(EventTypes.SIGN_FAIL);
// 			emitSignFail(false);
// 			config.onSignFail && config.onSignFail(ctx);
// 		}

// 		if (trigger_onVerifying) {
// 			e.emit(EventTypes.VERIFYING);
// 			emitVerifying(false);
// 			config.onVerifying && config.onVerifying(ctx);
// 		}

// 		if (trigger_onVerified) {
// 			e.emit(EventTypes.VERIFIED);
// 			emitVerified(false);
// 			config.onVerified && config.onVerified(ctx);
// 		}

// 		if (trigger_onVerifyFail) {
// 			e.emit(EventTypes.VERIFY_FAIL);
// 			emitVerifyFail(false);
// 			config.onVerifyFail && config.onVerifyFail(ctx);
// 		}
// 	}, [
// 		config, ctx, e,
// 		trigger_onNetworkChange, 
// 		trigger_accountChange, 
// 		trigger_onDisconnect, 
// 		trigger_onConnect,
// 		trigger_onConnecting,
// 		trigger_onSigning,
// 		trigger_onSigned,
// 		trigger_onSignFail,
// 		trigger_onVerifying,
// 		trigger_onVerified,
// 		trigger_onVerifyFail
// 	]);








//   	//+ ///////////////////////////////////////////////////////////////////////
// 	//+ ///////////////////////////////////////////////////////////  CONNECTION

// 	const verifyAddress = async (
// 		_address: string,
// 		_msg?: string
// 	): Promise<boolean> => {
// 		if (connectionAbandoned.current) {
// 			// console.log('connection abandoned........')
// 			resetApp();
// 			return false;
// 		}

// 		let globalSignature;
// 		let msg = _msg ? _msg : "Sign a message to verify address...?";
// 		const web3 = new Web3(Web3.givenProvider);

// 		// attempt to sign a message thru metamask
// 		// does this work thru any provider?
// 		const signMessage = async () => {
// 			// console.log('verifyAddress | signMessage | provider:', window.ethereum)
// 			try {
// 				const from = _address;
// 				const ethereum = window.ethereum;
// 				const sign = await ethereum.request({
// 					method: "personal_sign",
// 					params: [msg, from, "Random text"],
// 				});
// 				globalSignature = sign;
// 			} catch (err) {
// 				console.error(err);
// 				return false
// 			}
// 		};

// 		// use web3.eth to verify the signature and check the address returned
// 		// from the verification process against the address passed as arg
// 		const verifyMessage = async () => {
// 			try {
// 				const from = _address;
// 				const recoveredAddr = web3.eth.accounts.recover(msg, globalSignature);
// 				if (!recoveredAddr) return false;

// 				// console.log('verifyAddress | recoveredAddr : ' + recoveredAddr);

// 				if (recoveredAddr.toLowerCase() === from.toLowerCase()) {
// 					// console.log(`verifyAddress | Success: ${recoveredAddr}`);
// 					//! should really just return true here
// 					return _address;
// 				} else {
// 					// console.log(`verifyAddress | Failed to verify message:${recoveredAddr} vs ${from}`,);
// 					return false;
// 				}
// 			} catch (err) {
// 				// console.log(`verifyAddress | error:`,err);
// 				debug("verify address error:", err);
// 				return false;
// 			}
// 		};

// 		try {
// 		if (connectionAbandoned.current) {
// 			// console.log('connection abandoned........')
// 			resetApp();
// 			return false;
// 		}
// 		await signMessage();
// 		let verifiedAddress = await verifyMessage();

// 		if (!verifiedAddress) {
// 			// console.log('verifyAddress | Address could not be verified')
// 			return false;
// 		}

// 		return true;
// 		} catch (err) {
// 		// console.log(err)
// 		debug("verifyMessage | verify message error:", err);
// 		return false;
// 		}
// 	};




// 	//--------------------------------------------------------------------------
// 	const handleVerify = async () => {
// 		if (connectionAbandoned.current) {
// 			debug('handleVerify | abandoned...')
// 			resetApp();
// 			return;
// 		}

// 		let verificationResult = null;
// 		let messageWasSigned = false;

// 		if (config.requireSign) {
// 			emitSigning(true)
// 			setCtx({ ...ctx, status: ConnectionStatus.SIGNING });
// 			currentStatus.current = ConnectionStatus.SIGNING
// 			// console.log('requireSign | message:', config.signMessage)
// 			messageWasSigned = await verifyAddress(
// 				CONSTANTS.ADDRESS,
// 				config.signMessage
// 			);

// 			if(!messageWasSigned) {
// 				emitSignFail(true)
// 				debug('handleVerify | message was not signed...')
// 				resetApp()
// 				return {
// 					verificationResult: null,
// 					messageWasSigned,
// 				}
// 			}
// 			emitSigned(true)
// 		}

// 		if (config.verify) {
// 			emitVerifying(true)
// 			setCtx({ ...ctx, status: ConnectionStatus.VERIFYING });
// 			currentStatus.current = ConnectionStatus.VERIFYING


// 			if (connectionAbandoned.current) {
// 				emitVerifyFail(true)
// 				debug('handleVerify | abandoned...')
// 				resetApp();
// 				return;
// 			}

// 			verificationResult = await config.verify({
// 				...ctx,
// 				chainId: CONSTANTS.CHAIN_ID,
// 				chainName: CONSTANTS.CHAIN_NAME,
// 				address: CONSTANTS.ADDRESS,
// 			});

// 			if(verificationResult){
// 				emitVerified(true)
// 			}else{
// 				emitVerifyFail(true)
// 			}
// 		}

// 		// console.log('SETTING VERIFICATION RESULT:', verificationResult)

// 		// setCtx({
// 		//     ...ctx,
// 		//     verificationResult,
// 		//     signed: messageWasSigned,
// 		//     what: 'the fff?'
// 		// });

// 		return {
// 			verificationResult,
// 			messageWasSigned,
// 		};
// 	};




// 	//--------------------------------------------------------------------------
// 	const handleConnection = async (newAccount?: string) => {
// 		debug('handleConnection ===>')
// 		if (connectionInProgress.current) {
// 			debug('handleConnection | connection already in progress')
// 			return;
// 		}

		
// 		try {
// 			setCtx({ ...ctx, connecting: true, status: ConnectionStatus.CONNECTING});
// 			currentStatus.current = ConnectionStatus.CONNECTING
// 			connectionInProgress.current = true;
// 			connectionAbandoned.current = false;
// 			emitConnecting(true)

// 			if (ctx.connected && CONSTANTS.ADDRESS) {
// 				debug('handleConnection | already connected, re-sign / re-verify')
				
// 				let res = await handleVerify();
// 				setCtx({
// 					...ctx,
// 					verificationResult: res?.verificationResult,
// 					signed: res?.messageWasSigned,
// 				});
// 				return;
// 			}
// 			debug('handleConnection | connecting...')
			
// 			CONSTANTS.GLOBAL_WEB_3_MODAL = new IMPORTED_WEB_3_MODAL({
// 				network: getChainData(ctx.chainId || 1).network,
// 				cacheProvider: true,
// 				providerOptions: config.providerOptions,
// 			});

// 			CONSTANTS.PROVIDER = await CONSTANTS.GLOBAL_WEB_3_MODAL.connect();
// 			CONSTANTS.LIBRARY = new IMPORTED_WEB_3_PROVIDER(CONSTANTS.PROVIDER);
// 			CONSTANTS.NETWORK = await CONSTANTS.LIBRARY.getNetwork();
// 			CONSTANTS.ADDRESS =
// 				newAccount || CONSTANTS.PROVIDER.selectedAddress
// 				? CONSTANTS.PROVIDER.selectedAddress
// 				: CONSTANTS.PROVIDER.accounts[0];
// 			CONSTANTS.CHAIN_ID = CONSTANTS.NETWORK.chainId;
// 			CONSTANTS.CHAIN_NAME = CONSTANTS.NETWORK.name;

// 			let res = await handleVerify();

			
// 			if (connectionAbandoned.current) {
// 				debug('handleConnection | abandoned...')
// 				resetApp();
// 				return;
// 			}
			
// 			await subscribeToProviderEvents(CONSTANTS.PROVIDER);
// 			setCtx({
// 				...ctx,
// 				chainId: CONSTANTS.CHAIN_ID,
// 				chainName: CONSTANTS.CHAIN_NAME,
// 				address: CONSTANTS.ADDRESS,
// 				connected: true,
// 				connecting: false,
// 				status: ConnectionStatus.CONNECTED,
// 				verificationResult: res?.verificationResult,
// 				signed: res?.messageWasSigned,
// 			});
// 			currentStatus.current = ConnectionStatus.CONNECTED


// 			sessionStorage.setItem(CONSTANTS.SSKEY_WAS_CONNECTED, "true");

// 			connectionInProgress.current = false;
// 			debug('handleConnection | connected!')
// 			emitConnect(true)

// 		} catch (err) {
// 			debug("handleConnection | connect error:", err);
// 			setCtx(CONSTANTS.DEFAULT_CONTEXT);
// 			connectionInProgress.current = false;
// 			currentStatus.current = ConnectionStatus.NOT_CONNECTED
// 		}
// 	};

// 	//--------------------------------------------------------------------------
// 	const subscribeToProviderEvents = async (provider: any) => {
// 		debug("W3M DEBUG | subscribeToProviderEvents");

// 		if (!provider.on) {
// 		return;
// 		}

// 		provider.on("accountsChanged", (accounts) => {
// 			changedAccount(accounts);
// 		});
// 		provider.on("chainChanged", () => {
// 			emitNetworkChange(true)
// 			handleConnection();
// 		});
// 		provider.on("disconnect", () => {
// 			resetApp();
// 		});

// 		// await web3Modal.off('accountsChanged');
// 	};

// 	//--------------------------------------------------------------------------
// 	const unSubscribe = async (provider: any) => {
// 		// Workaround for metamask widget > 9.0.3 (provider.off is undefined);
// 		// window.location.reload();
// 		if (!provider.off) {
// 		return;
// 		}

// 		provider.off("accountsChanged", changedAccount);
// 		provider.off("networkChanged", handleConnection);
// 		provider.off("close", resetApp);
// 	};

// 	//--------------------------------------------------------------------------
// 	const changedAccount = async (accounts: any) => {
// 		debug("changedAccount ===>");
// 		if (!accounts.length) {
// 			await resetApp();
// 		} else {
// 			handleConnection(accounts[0]);
// 			emitAccountChange(true)
// 		//   e.emit(EventTypes.ACCOUNT_CHANGED);
// 		}
// 	};

// 	//--------------------------------------------------------------------------
// 	const resetApp = async () => {
// 		debug("resetApp ===>");
// 		if(connectionAbandoned.current){
// 			debug('resetApp | connection abandoned, already reset')
// 			return
// 		}

// 		connectionAbandoned.current = true;
// 		connectionInProgress.current = false;
// 		sessionStorage.setItem(CONSTANTS.SSKEY_WAS_CONNECTED, "false");

// 		if (CONSTANTS.GLOBAL_WEB_3_MODAL) {
// 			debug("resetApp | closing provider, clearing cached provider");
// 			await CONSTANTS.GLOBAL_WEB_3_MODAL?.provider?.close();
// 			await CONSTANTS.GLOBAL_WEB_3_MODAL?.clearCachedProvider();
// 		}

// 		if (CONSTANTS.GLOBAL_WEB_3_PROVIDER) {
// 			debug("resetApp | unsubscripbing from provider");
// 			await unSubscribe(CONSTANTS.GLOBAL_WEB_3_PROVIDER?.provider);
// 		}

// 		let shouldReconnect = sessionStorage.getItem(CONSTANTS.SSKEY_SHOULD_RECONNECT) === 'true' ? true : false

//     	// currently not connected - use same status
// 		if(currentStatus.current === ConnectionStatus.CONNECTED){
// 			debug("resetApp | was connected - disconnecting, setting default context");
// 			setCtx((_ctx:any) => ({ ...CONSTANTS.DEFAULT_CONTEXT, status: ConnectionStatus.DISCONNECTED, reconnect: shouldReconnect }));
// 			currentStatus.current = ConnectionStatus.DISCONNECTED
// 			emitDisconnect(true)
// 		}else{
// 			debug("resetApp | not yet connected - resetting to NOT_CONNECTED");
// 			setCtx({ ...CONSTANTS.DEFAULT_CONTEXT, status: ConnectionStatus.NOT_CONNECTED, reconnect: shouldReconnect });
// 			currentStatus.current = ConnectionStatus.NOT_CONNECTED
// 			emitDisconnect(true)
// 		}
// 		connectionAbandoned.current = false
// 	};









//   	//+ ///////////////////////////////////////////////////////////////////////
// 	//+ /////////////////////////////////////////////////////////////  PROVIDER


// 	useEffect(() => {
// 		if (wasInitialized.current) return;
// 		debug("init | DEBUG ACTIVE");


// 		// Was this user connected previously (before unmount)
// 		let wasConnected = sessionStorage.getItem(CONSTANTS.SSKEY_WAS_CONNECTED);
// 		let shouldReconnect = sessionStorage.getItem(CONSTANTS.SSKEY_SHOULD_RECONNECT);

// 		setCtx({ ...ctx, reconnect: shouldReconnect === "true" ? true : false });

// 		// debug("init | should reconnect:", {
// 		// 	reconnect: config.reconnect,
// 		// 	wasConnected,
// 		// 	isConnected: ctx.connected,
// 		// 	shouldReconnect,
// 		// });

// 		// If should reconnect && was connected && is not connected rn
// 		if (
// 			wasConnected === "true" &&
// 			!ctx.connected &&
// 			shouldReconnect === "true"
// 		) {
// 			console.dir("init | reconnecting...");
// 			handleConnection();
// 		}
// 		wasInitialized.current = true;
		
// 		return () => { 
// 			e.removeAllListeners() 
// 		}
// 	}, []);

// 	return {
// 		...ctx,
// 		connect: handleConnection,
// 		disconnect: resetApp,
// 		enableReconnect: () => toggleReconnect(true),
// 		disableReconnect: () => toggleReconnect(false),
// 		onEvent,
// 		removeEvents: () => { e.removeAllListeners() }
// 	};
// };
