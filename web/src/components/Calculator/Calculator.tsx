import React, { useEffect } from 'react'

import { Card, Group, NumberInput, Text } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconUser } from '@tabler/icons-react'
import { useAtom } from 'jotai'

import { citizensAtom, uecAtom } from 'src/components/Calculator/Store'

const Calculator = () => {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      uec: 0,
      citizens: 0,
    },
  })
  const [, setUEC] = useAtom(uecAtom)
  const [, setCitizens] = useAtom(citizensAtom)
  useEffect(() => {
    //   update the atom here
    if (form.isTouched()) {
      setUEC(form.getValues().uec)
      setCitizens(form.getValues().citizens)
    }
  }, [form])

  return (
    <div>
      <Card withBorder shadow="sm" radius="md">
        <Card.Section withBorder inheritPadding py="xs">
          <Group justify="space-between">
            <Text fw={500}>Profits</Text>
          </Group>
        </Card.Section>

        <NumberInput
          key={form.key('uec')}
          {...form.getInputProps('uec')}
          label="aUEC Amount"
          decimalSeparator=","
          leftSection={'$'}
          defaultValue={0}
          mt="md"
        />
        <NumberInput
          key={form.key('citizens')}
          {...form.getInputProps('citizens')}
          label="Citizens"
          decimalSeparator=","
          leftSection={<IconUser size="1rem" />}
          defaultValue={0}
          mt="md"
        />
      </Card>
    </div>
  )
}

export default Calculator
