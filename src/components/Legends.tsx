"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

export default function Legends(props:any) {
  const [mobile,setMobile]=useState(0)
  const [desktop,setDesktop]=useState(0)
    
    let mob=0
    let desk=0
    const data=props.props
   
    if (!data){return(<div>can not display graph  </div>)}
    for (let i = 0; i < data.length; i++) {
        if (data[i].userAgent.includes("Android")){++mob}
        else{++desk}
      }

      // console.log(desktop,mobile)
      useEffect(() => {setDesktop(desk),setMobile(mob)},[0]);


  return (
    <div className="grid aspect-video w-full max-w-md justify-center text-foreground md:grid-cols-2 [&>div]:relative [&>div]:flex [&>div]:h-[137px] [&>div]:w-[224px] [&>div]:items-center [&>div]:justify-center [&>div]:p-4">
      <div>
        <div className="absolute left-[-35px] top-[45px] z-10 text-sm font-medium">
          
        </div>

        <TooltipDemo
          label="Device Type"
          payload={[
            { name: "Desktop", value: desktop, fill: "hsl(var(--chart-1))" },
            { name: "Mobile", value: mobile, fill: "hsl(var(--chart-2))" },
          ]}
          className="w-[8rem]"
        />
      </div>
      <div className="!hidden md:!flex">
        <TooltipDemo
          label="Total Clicks"
          payload={[
            { name: "All device", value:mobile+desktop, fill: "hsl(var(--chart-3))" },
          ]}
          className="w-[9rem]"
          indicator="line"
        />
      </div>
    </div>
  )
}

function TooltipDemo({
  indicator = "dot",
  label,
  payload,
  hideLabel,
  hideIndicator,
  className,
}: {
  label: string
  hideLabel?: boolean
  hideIndicator?: boolean
  indicator?: "line" | "dot" | "dashed"
  payload: {
    name: string
    value: number
    fill: string
  }[]
  nameKey?: string
  labelKey?: string
} & React.ComponentProps<"div">) {
  const tooltipLabel = hideLabel ? null : (
    <div className="font-medium">{label}</div>
  )

  if (!payload?.length) {
    return null
  }

  const nestLabel = payload.length === 1 && indicator !== "dot"

  return (
    <div
      className={cn(
        "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl transition-all ease-in-out hover:-translate-y-0.5",
        className
      )}
    >
      {!nestLabel ? tooltipLabel : null}
      <div className="grid gap-1.5">
        {payload.map((item, index) => {
          const indicatorColor = item.fill

          return (
            <div
              key={index}
              className={cn(
                "flex w-full items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                indicator === "dot" && "items-center"
              )}
            >
              <>
                {!hideIndicator && (
                  <div
                    className={cn(
                      "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
                      {
                        "h-2.5 w-2.5": indicator === "dot",
                        "w-1": indicator === "line",
                        "w-0 border-[1.5px] border-dashed bg-transparent":
                          indicator === "dashed",
                        "my-0.5": nestLabel && indicator === "dashed",
                      }
                    )}
                    style={
                      {
                        "--color-bg": indicatorColor,
                        "--color-border": indicatorColor,
                      } as React.CSSProperties
                    }
                  />
                )}
                <div
                  className={cn(
                    "flex flex-1 justify-between leading-none",
                    nestLabel ? "items-end" : "items-center"
                  )}
                >
                  <div className="grid gap-1.5">
                    {nestLabel ? tooltipLabel : null}
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-mono font-medium tabular-nums text-foreground">
                    {item.value.toLocaleString()}
                  </span>
                </div>
              </>
            </div>
          )
        })}
      </div>
    </div>
  )
}
