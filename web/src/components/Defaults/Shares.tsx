import React, { useEffect } from 'react'

import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Group,
  NativeSelect,
  NumberInput,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { randomId } from '@mantine/hooks'
import {
  IconHelpHexagon,
  IconQuestionMark,
  IconTrash,
} from '@tabler/icons-react'
import { useAtom } from 'jotai'

import { sharesAtom } from 'src/lib/store'

const Shares = () => {
  const [shares, setShares] = useAtom(sharesAtom)
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      shares: shares,
    },
  })

  const fields = form.getValues().shares.map((item, index) => (
    <Group key={item.key} mt="xs" mx={'xs'}>
      <TextInput
        placeholder="name"
        key={form.key(`shares.${index}.name`)}
        {...form.getInputProps(`shares.${index}.name`)}
      />
      <NativeSelect
        key={form.key(`shares.${index}.shareType`)}
        data={['Equal Share', 'Percentage', 'Flat Rate']}
        {...form.getInputProps(`shares.${index}.shareType`)}
      />
      <NumberInput
        key={form.key(`shares.${index}.amount`)}
        style={{ flex: 1 }}
        {...form.getInputProps(`shares.${index}.amount`)}
      />

      <ActionIcon
        color="red"
        onClick={() => form.removeListItem('shares', index)}
      >
        <IconTrash size="1rem" />
      </ActionIcon>
    </Group>
  ))

  useEffect(() => {
    if (form.isTouched()) {
      setShares(form.getValues().shares)
    }
  }, [form, setShares])

  return (
    <Card withBorder shadow="sm" radius="md">
      <Card.Section withBorder inheritPadding py="xs">
        <Group justify="space-between">
          <Group>
            <Text fw={500}>Shares</Text>
            <Tooltip
              label={
                'Shares do not take into account the fee for transfers at this time'
              }
            >
              <IconHelpHexagon size="1rem" />
            </Tooltip>
          </Group>
          <Badge color="violet">{fields.length}</Badge>
        </Group>
      </Card.Section>
      <div className={'mt-4'}>
        {fields.length < 1 && (
          <Text c="dimmed" ta="center">
            No one here...
          </Text>
        )}
        <div className={'max-h-40 overflow-auto'}>{fields}</div>
        <Group justify="center" mt="md">
          <Button
            onClick={() =>
              form.insertListItem('shares', {
                name: '',
                shareType: 'Equal Share',
                amount: 1,
                key: randomId(),
              })
            }
            color={'violet'}
          >
            Add Share
          </Button>
          <Button
            color={'gray'}
            onClick={() => {
              form.setValues({ shares: [] })
              setShares([])
            }}
          >
            Reset
          </Button>
        </Group>
      </div>
    </Card>
  )
}

export default Shares
