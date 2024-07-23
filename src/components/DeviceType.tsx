"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"
import Legends from "./Legends"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useState } from "react"

export default function DeviceType(props:any) {
  console.log(props,"in the devicetype")
  
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
      const chartData = [
        {devicetype:"desktop",visitors:desktop,fill:"var(--color-Desktop)" },
        {devicetype:"mobile",visitors:mobile,fill:"var(--color-Mobile)" },
        
      ]
      
      const chartConfig = {
        Clicks:{
          label:"Clicks"
        },
        Desktop: {
          label: "desktop",
          color: "hsl(var(--chart-1))",
        },
        Mobile: {
          label: "mobile",
          color: "hsl(var(--chart-2))",
        },
        android: {
          label: "Edge",
          color: "hsl(var(--chart-6))",
        },
        other: {
          label: "Other",
          color: "hsl(var(--chart-5))",
        },
      } satisfies ChartConfig
      

  const totalVisitors =mobile+desktop

  return (
    <Card className="flex flex-col">

      <CardHeader className="items-center pb-0">
        <CardTitle>Total visitors</CardTitle>
        <CardDescription>from date of creation of link</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="devicetype"
              innerRadius={50}
              strokeWidth={4}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        
      </CardFooter>
      <Legends props={data}/>
    </Card>
  )
}
