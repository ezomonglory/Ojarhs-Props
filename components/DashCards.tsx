import { ArrowForwardIos } from '@mui/icons-material'
import { Button, Card, CircularProgress } from '@mui/material'
import { useState } from 'react'

function DashCards({ name, value, className, endIcon, handleClick: exportFunc, buttonTitle }: {
  name: string
  value: string | number
  endIcon?: React.ReactNode
  className?: string
  handleClick?: () => boolean | Promise<boolean>
  buttonTitle?: string
}) {
  return (
    <Card elevation={2} className={`h-[15vh] grid grid-cols-7 rounded-md hover:opacity-80 transit ${className || ''}`}>
      <div className='col-span-5 p-4 flex flex-col text-white justify-between'>
        <div className='uppercase text-md'>
          {name}
        </div>
        <div className='text-2xl lg:text-4xl font-semibold'
          style={{ fontFamily: 'Space Grotesk' }}
        >
          {value}
        </div>
      </div>
      <div className='col-span-2 flex flex-col items-center justify-center relative'>
        {endIcon}
        {exportFunc !== undefined && <>
          <CardProcess handleClick={exportFunc} title={buttonTitle} />
        </>}
      </div>
    </Card >
  )
}

const CardProcess = ({ handleClick, title }: {
  handleClick: () => boolean | Promise<boolean>
  title?: string
}) => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(true)
  return <Button className='absolute cursor-pointer bottom-0 right-0 px-2 py-1'
    variant='outlined'
    size='small'
    endIcon={loading ? <CircularProgress size={14} /> : <ArrowForwardIos fontSize='small' />}
    disabled={loading}
    color={success ? 'primary' : 'error'}
    onClick={async () => {
      setLoading(true)
      setSuccess(await handleClick())
      setLoading(false)
    }}
  >
    {title || 'export'}
  </Button>
}
export default DashCards