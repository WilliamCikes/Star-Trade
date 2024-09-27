import React from 'react'

import { Card, Container, Grid, Group, Text } from '@mantine/core'

const Receipt = ({ earnings }) => {
  return (
    <Container>
      <Card withBorder shadow="sm" radius="md">
        <Card.Section withBorder inheritPadding py="xs">
          <Group>
            <Text fw={500}>Receipt</Text>
          </Group>
        </Card.Section>
        <Group mt={'md'}>
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-300">Your Earnings:</p>
            <p className="text-lg font-semibold text-blue-300">
              {earnings.yourEarnings.toFixed()} UEC
            </p>
          </div>
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-300">
              Citizens Earnings:
            </p>
            <p className="text-lg font-semibold text-blue-300">
              {earnings.payeeEarnings.toFixed()} UEC
            </p>
          </div>
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-300">Total Fee Paid:</p>
            <p className="text-lg font-semibold text-red-300">
              {earnings.totalFeePaid.toFixed()} UEC
            </p>
          </div>
        </Group>

        {earnings.shares.map((share) => (
          <Group key={share.key} mt={'md'}>
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-300">
                {share.name} Earnings:
              </p>
              <p className="text-lg font-semibold text-blue-300">
                {share.amount.toFixed()} UEC
              </p>
            </div>
          </Group>
        ))}
      </Card>
    </Container>
  )
}

export default Receipt
