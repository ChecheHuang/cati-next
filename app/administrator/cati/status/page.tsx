import React from 'react'

function Cati() {
  const agentArr = [
    { agent: '101', status: ' 待機中', phone: '0912345678' },
    { agent: '102', status: ' 待機中', phone: '0912345678' },
    { agent: '103', status: ' 待機中', phone: '0912345678' },
  ]

  return (
    <div className="flex w-full flex-wrap  justify-center gap-4">
      {agentArr.map(({ agent, status, phone }) => {
        return (
          <div
            key={agent}
            className="flex w-60 flex-col items-center self-start   "
          >
            <div className="flex h-10 w-full items-center justify-center bg-primary  ">
              {agent}
            </div>
            <div className="flex h-10 w-full items-center justify-center bg-secondary  ">
              {status}
            </div>
            <div className="flex h-10 w-full items-center justify-center bg-gray-400 text-white ">
              {phone}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Cati
