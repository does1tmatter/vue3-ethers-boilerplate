import { ref, reactive } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { ethers } from 'ethers'

export const useWallet = createSharedComposable(() => {

  let connection = reactive({})
  const provider = ref(null)
  let signer = reactive({})

  const connectProvider = (_provider) => {
    connection = new ethers.providers.Web3Provider(_provider)
    provider.value = _provider
    signer = connection.getSigner()
  }

  const signMessage = async (message) => await signer.signMessage(message).then(res => console.log(res))

  const requestAccounts = async () => await connection.send('eth_requestAccounts', [])

  const getCurrentUser = async () => await connection.send('eth_accounts', [])

  const getBalance = async (address) => await connection.getBalance(address)
  
  const lookupAddress = async (address) => await connection.lookupAddress(address)

  const getAvatar = async (ensName) => await connection.getAvatar(ensName)

  const request = async (payload) => await provider.value.request(payload)

  const switchNetwork = async () => await provider.value.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: '0x1' }] })

  const getChainId = async () => await provider.value.request({ method: 'eth_chainId'})

  const getProvider = () => connection

  const getSigner = () => signer

  
  return {
    connection,
    provider,
    signer,
    connectProvider,
    signMessage,
    requestAccounts,
    getCurrentUser,
    getBalance,
    lookupAddress,
    getAvatar,
    request,
    switchNetwork,
    getChainId,
    getProvider,
    getSigner
  }
})
