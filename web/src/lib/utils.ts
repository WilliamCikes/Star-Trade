import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// Interface for the result of earnings calculation
export interface EarningsResult {
  yourEarnings: number
  payeeEarnings: number
  totalFeePaid: number
}

export const calculateEarnings = (
  totalAmount: number,
  numberOfCitizens: number
): EarningsResult => {
  if (numberOfCitizens <= 1) {
    return {
      yourEarnings: 0,
      payeeEarnings: 0,
      totalFeePaid: 0,
    }
  }

  // Calculate your earnings (total divided by the number of citizens)
  const yourEarnings = totalAmount / numberOfCitizens

  // Calculate payee earnings (remaining amount minus 5% fee, divided by number of citizens - 1)
  const remainingAmount = totalAmount - yourEarnings
  const fee = remainingAmount * 0.05
  const totalFeePaid = fee
  const payeeEarnings = (remainingAmount - fee) / (numberOfCitizens - 1)

  return {
    yourEarnings,
    payeeEarnings,
    totalFeePaid,
  }
}
