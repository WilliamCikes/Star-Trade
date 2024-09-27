import React, { useState, Suspense } from 'react'

import { motion } from 'framer-motion'

import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { BackgroundBeams } from 'src/components/ui/backgroundBeams'
import { Cover } from 'src/components/ui/cover'
import { FlipWords } from 'src/components/ui/flipWords'
import {
  GlowingStarsBackgroundCard,
  GlowingStarsDescription,
  GlowingStarsTitle,
} from 'src/components/ui/glowingStars'
import { ShootingStars } from 'src/components/ui/shootingStars'
import { StarsBackground } from 'src/components/ui/starsBackground'
import { TextHoverEffect } from 'src/components/ui/textHoverEffect'
import {
  TextRevealCard,
  TextRevealCardDescription,
} from 'src/components/ui/textRevealCard'
import { calculateEarnings, cn, EarningsResult } from 'src/lib/utils'
const World = React.lazy(() =>
  import('src/components/ui/globe').then((module) => ({
    default: module.World,
  }))
)

const globeConfig = {
  pointSize: 4,
  globeColor: '#1e293b',
  showAtmosphere: true,
  atmosphereColor: '#38bdf8',
  atmosphereAltitude: 0.1,
  emissive: '#062056',
  emissiveIntensity: 0.1,
  shininess: 0.5,
  polygonColor: 'rgba(255,255,255,0.24)',
  ambientLight: '#38bdf8',
  directionalLeftLight: '#ffffff',
  directionalTopLight: '#ffffff',
  pointLight: '#ffffff',
  arcTime: 3000,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  initialPosition: { lat: 22.3193, lng: 114.1694 },
  autoRotate: true,
  autoRotateSpeed: 0.5,
}
const colors = ['#4ade80', '#10b981', '#16a34a']
const sampleArcs = [
  {
    order: 1,
    startLat: -19.885592,
    startLng: -43.951191,
    endLat: -22.9068,
    endLng: -43.1729,
    arcAlt: 0.1,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 1,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 3.139,
    endLng: 101.6869,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 1,
    startLat: -19.885592,
    startLng: -43.951191,
    endLat: -1.303396,
    endLng: 36.852443,
    arcAlt: 0.5,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 2,
    startLat: 1.3521,
    startLng: 103.8198,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 2,
    startLat: 51.5072,
    startLng: -0.1276,
    endLat: 3.139,
    endLng: 101.6869,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 2,
    startLat: -15.785493,
    startLng: -47.909029,
    endLat: 36.162809,
    endLng: -115.119411,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 3,
    startLat: -33.8688,
    startLng: 151.2093,
    endLat: 22.3193,
    endLng: 114.1694,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 3,
    startLat: 21.3099,
    startLng: -157.8581,
    endLat: 40.7128,
    endLng: -74.006,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 3,
    startLat: -6.2088,
    startLng: 106.8456,
    endLat: 51.5072,
    endLng: -0.1276,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 4,
    startLat: 11.986597,
    startLng: 8.571831,
    endLat: -15.595412,
    endLng: -56.05918,
    arcAlt: 0.5,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 4,
    startLat: -34.6037,
    startLng: -58.3816,
    endLat: 22.3193,
    endLng: 114.1694,
    arcAlt: 0.7,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 4,
    startLat: 51.5072,
    startLng: -0.1276,
    endLat: 48.8566,
    endLng: -2.3522,
    arcAlt: 0.1,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 5,
    startLat: 14.5995,
    startLng: 120.9842,
    endLat: 51.5072,
    endLng: -0.1276,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 5,
    startLat: 1.3521,
    startLng: 103.8198,
    endLat: -33.8688,
    endLng: 151.2093,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 5,
    startLat: 34.0522,
    startLng: -118.2437,
    endLat: 48.8566,
    endLng: -2.3522,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 6,
    startLat: -15.432563,
    startLng: 28.315853,
    endLat: 1.094136,
    endLng: -63.34546,
    arcAlt: 0.7,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 6,
    startLat: 37.5665,
    startLng: 126.978,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.1,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 6,
    startLat: 22.3193,
    startLng: 114.1694,
    endLat: 51.5072,
    endLng: -0.1276,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 7,
    startLat: -19.885592,
    startLng: -43.951191,
    endLat: -15.595412,
    endLng: -56.05918,
    arcAlt: 0.1,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 7,
    startLat: 48.8566,
    startLng: -2.3522,
    endLat: 52.52,
    endLng: 13.405,
    arcAlt: 0.1,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 7,
    startLat: 52.52,
    startLng: 13.405,
    endLat: 34.0522,
    endLng: -118.2437,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 8,
    startLat: -8.833221,
    startLng: 13.264837,
    endLat: -33.936138,
    endLng: 18.436529,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 8,
    startLat: 49.2827,
    startLng: -123.1207,
    endLat: 52.3676,
    endLng: 4.9041,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 8,
    startLat: 1.3521,
    startLng: 103.8198,
    endLat: 40.7128,
    endLng: -74.006,
    arcAlt: 0.5,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 9,
    startLat: 51.5072,
    startLng: -0.1276,
    endLat: 34.0522,
    endLng: -118.2437,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 9,
    startLat: 22.3193,
    startLng: 114.1694,
    endLat: -22.9068,
    endLng: -43.1729,
    arcAlt: 0.7,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 9,
    startLat: 1.3521,
    startLng: 103.8198,
    endLat: -34.6037,
    endLng: -58.3816,
    arcAlt: 0.5,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 10,
    startLat: -22.9068,
    startLng: -43.1729,
    endLat: 28.6139,
    endLng: 77.209,
    arcAlt: 0.7,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 10,
    startLat: 34.0522,
    startLng: -118.2437,
    endLat: 31.2304,
    endLng: 121.4737,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 10,
    startLat: -6.2088,
    startLng: 106.8456,
    endLat: 52.3676,
    endLng: 4.9041,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 11,
    startLat: 41.9028,
    startLng: 12.4964,
    endLat: 34.0522,
    endLng: -118.2437,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 11,
    startLat: -6.2088,
    startLng: 106.8456,
    endLat: 31.2304,
    endLng: 121.4737,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 11,
    startLat: 22.3193,
    startLng: 114.1694,
    endLat: 1.3521,
    endLng: 103.8198,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 12,
    startLat: 34.0522,
    startLng: -118.2437,
    endLat: 37.7749,
    endLng: -122.4194,
    arcAlt: 0.1,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 12,
    startLat: 35.6762,
    startLng: 139.6503,
    endLat: 22.3193,
    endLng: 114.1694,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 12,
    startLat: 22.3193,
    startLng: 114.1694,
    endLat: 34.0522,
    endLng: -118.2437,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 13,
    startLat: 52.52,
    startLng: 13.405,
    endLat: 22.3193,
    endLng: 114.1694,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 13,
    startLat: 11.986597,
    startLng: 8.571831,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 13,
    startLat: -22.9068,
    startLng: -43.1729,
    endLat: -34.6037,
    endLng: -58.3816,
    arcAlt: 0.1,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 14,
    startLat: -33.936138,
    startLng: 18.436529,
    endLat: 21.395643,
    endLng: 39.883798,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
]

const HomePage = () => {
  const [UEC, setUEC] = useState(0)
  const [citizens, setCitizens] = useState(0)
  const [earnings, setEarnings] = useState<EarningsResult | null>()

  const handleCalculate = () => {
    setEarnings(calculateEarnings(UEC, citizens))
  }
  return (
    <div className={'dark'}>
      <Metadata title="Home" description="Home page" />
      <div className="bg relative flex h-screen w-full flex-col items-center justify-center overflow-visible rounded-md bg-neutral-900">
        <div className={'bg- z-10 h-full w-full flex-col'}>
          <div className="flex py-4">
            <div className="mx-auto text-center text-4xl font-black text-neutral-50 dark:text-neutral-100">
              STAR
              <FlipWords
                words={['FEE']}
                className={'uppercase text-neutral-50'}
              />
            </div>
          </div>
          <div className={'flex h-full   w-full justify-center'}>
            <div className={'flex flex-col'}>
              <div className="max-w-sm transform rounded-lg border border-gray-700 bg-gray-900 p-6 text-white shadow-xl transition-transform duration-300 hover:scale-105">
                <h2 className="mb-4 text-2xl font-bold tracking-wider text-blue-400">
                  Trading Split Calculator
                </h2>
                <div className="mb-4">
                  <label
                    className="mb-2 block text-sm font-medium text-gray-300"
                    htmlFor="uec"
                  >
                    UEC Amount
                  </label>
                  <input
                    type="number"
                    id="uec"
                    onChange={(e) => setUEC(parseFloat(e.target.value))}
                    className="w-full rounded-lg bg-gray-800 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter UEC amount"
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="mb-2 block text-sm font-medium text-gray-300"
                    htmlFor="citizens"
                  >
                    Number of Citizens
                  </label>
                  <input
                    type="number"
                    id="citizens"
                    onChange={(e) => setCitizens(parseInt(e.target.value, 10))}
                    className="w-full rounded-lg bg-gray-800 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter number of citizens"
                  />
                </div>
                <button
                  onClick={handleCalculate}
                  className="w-full rounded-lg bg-blue-500 py-2 font-semibold tracking-wide text-white shadow-md transition-colors duration-200 hover:bg-blue-600"
                >
                  Calculate
                </button>
              </div>

              {earnings && (
                <div className="mt-8 max-w-sm rounded-lg border border-gray-700 bg-gray-800 p-6 text-white shadow-xl">
                  <h3 className="mb-4 text-xl font-bold tracking-wider text-green-400">
                    Tax Invoice
                  </h3>
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-300">
                      Your Earnings:
                    </p>
                    <p className="text-lg font-semibold text-blue-300">
                      {earnings.yourEarnings.toFixed(2)} UEC
                    </p>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-300">
                      Payee Earnings:
                    </p>
                    <p className="text-lg font-semibold text-blue-300">
                      {earnings.payeeEarnings.toFixed(2)} UEC
                    </p>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-300">
                      Total Fee Paid:
                    </p>
                    <p className="text-lg font-semibold text-red-300">
                      {earnings.totalFeePaid.toFixed(2)} UEC
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="absolute inset-0 z-0">
          {/*<div className="absolute -bottom-20 z-10 h-72 w-full md:h-full">*/}
          {/*  <Suspense fallback={<div>Loading Globe...</div>}>*/}
          {/*    <World globeConfig={globeConfig} data={sampleArcs} />*/}
          {/*  </Suspense>*/}
          {/*</div>*/}
          <ShootingStars />
          <StarsBackground />
        </div>
      </div>
    </div>
  )
}

export default HomePage
