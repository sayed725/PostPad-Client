import { Card, CardContent, CardHeader, CardTitle, } from '../../../../@/components/ui/card'
import React from 'react'

const StatsCard = ({title, value, icon, subTitle}) => {
  return (
   <Card className="border shadow-none bg-white border-[#e5e7eb] w-full dark:bg-[#20293d]">
          <CardHeader className="flex flex-row-reverse justify-end items-center gap-2 space-y-0 relative">
            <CardTitle className="text-lg font-bold">{title}</CardTitle>
            <div className="h-8 w-8 rounded-full bg-[#005694] text-white flex items-center justify-center">
              {icon}
            </div>
          </CardHeader>
          <CardContent className="relative ml-2 -mt-8">
            <div className="text-3xl font-bold">{value}</div>
            <div className="flex items-center mt-2">
              <p className="text-xs text-muted-foreground">{subTitle}</p>
            </div>
          </CardContent>
        </Card>
  )
}

export default StatsCard