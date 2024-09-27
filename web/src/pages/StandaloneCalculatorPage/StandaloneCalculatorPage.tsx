// import { Link, routes } from '@redwoodjs/router'
import React, { useState } from 'react'

import { Button, Card, Grid, Group, Text, Title } from '@mantine/core'
import { useAtom } from 'jotai'

import { Metadata } from '@redwoodjs/web'

import Calculator from 'src/components/Calculator/Calculator'
import Receipt from 'src/components/Calculator/Receipt'
import { uecAtom, citizensAtom } from 'src/components/Calculator/Store'
import Shares from 'src/components/Defaults/Shares'
import { sharesAtom } from 'src/lib/store'
import { calculateEarnings, EarningsResult } from 'src/lib/utils'

const StandaloneCalculatorPage = () => {
  const [data, setData] = useState<EarningsResult | null>()
  const [shares] = useAtom(sharesAtom)
  const [uec] = useAtom(uecAtom)
  const [citizens] = useAtom(citizensAtom)

  const onCalculate = () => {
    console.log('Calculating')
    // calculate
    setData(calculateEarnings(uec, citizens, shares))
  }

  return (
    <>
      <Metadata
        title="Basic Calculator"
        description="Basic Calculator for money transfer and split profits"
      />
      <Title order={2}>Profit Share Splitting</Title>
      {/*  card for */}
      <div className={'mt-4'}>
        <Grid>
          <Grid.Col span={6}>
            <Calculator />
          </Grid.Col>
          <Grid.Col span={6} className={'max-h-'}>
            <Shares />
          </Grid.Col>
          <Grid.Col span={12}>
            <Card withBorder shadow="sm" radius="md">
              <Button size="md" onClick={onCalculate}>
                Calculate
              </Button>
            </Card>
          </Grid.Col>
          <Grid.Col span={12}>{data && <Receipt earnings={data} />}</Grid.Col>
        </Grid>
      </div>
    </>
  )
}

export default StandaloneCalculatorPage
