import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { Shares } from 'src/lib/store'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// Interface for the result of earnings calculation
export interface EarningsResult {
  yourEarnings: number
  payeeEarnings: number
  totalFeePaid: number
  shares: Shares[]
}

export const calculateEarnings = (
  totalAmount: number,
  numberOfCitizens: number,
  shares: Shares[]
): EarningsResult => {
  if (numberOfCitizens <= 1 || totalAmount <= 0) {
    return null
  }
  console.log(shares)

  let currentAmount = totalAmount
  // Calculate the total amount for each share
  // handle share types
  const returnedShares = shares.map((share) => {
    if (share.shareType === 'Equal Share') {
      const amount = totalAmount / numberOfCitizens
      currentAmount -= amount
      return { ...share, amount }
    } else if (share.shareType === 'Percentage') {
      const amount = (share.amount / 100) * totalAmount
      currentAmount -= share.amount
      return { ...share, amount }
    } else {
      currentAmount -= share.amount
      return share
    }
  })

  // Calculate your earnings (total divided by the number of citizens)
  const yourEarnings = currentAmount / numberOfCitizens

  // Calculate payee earnings (remaining amount minus 5% fee, divided by number of citizens - 1)
  const remainingAmount = currentAmount - yourEarnings
  const fee = remainingAmount * 0.05
  const totalFeePaid = fee
  const payeeEarnings = (remainingAmount - fee) / (numberOfCitizens - 1)

  console.log('Your Earnings:', yourEarnings)

  return {
    yourEarnings,
    payeeEarnings,
    totalFeePaid,
    shares: returnedShares,
  }
}
