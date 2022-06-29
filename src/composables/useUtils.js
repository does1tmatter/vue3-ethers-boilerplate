import { ethers } from 'ethers'
import { computed } from 'vue'

export const useUtils = () => {

  const isMetaMaskInstalled = computed(() => Boolean(window.ethereum))
  
  const sliceAddress = (_address, chars = 5) => _address ? `${_address.slice(0, chars)}...${_address.slice(-chars)}` : null

  const formatBalance = (balance) => {
    const number = ethers.utils.formatEther(balance)
    return parseFloat(number).toFixed(4)
  }

  const randomNumber = (max) => Math.floor(Math.random() * max) + 1

  return {
    isMetaMaskInstalled,
    sliceAddress,
    formatBalance,
    randomNumber
  }
}