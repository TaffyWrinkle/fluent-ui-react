import { Tooltip } from '@fluentui/react'
import * as React from 'react'

const TooltipMinimalPerf = () => (
  <Tooltip>
    <div />
  </Tooltip>
)

TooltipMinimalPerf.iterations = 5000
TooltipMinimalPerf.filename = 'TooltipMinimal.perf.tsx'

export default TooltipMinimalPerf
