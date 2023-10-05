// ** MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

type AllKanwilProps = {
  series: number
  color?: string
  seriesName: string
  seriesTotal: number
}

const AllKanwil = (props: AllKanwilProps) => {
  const { series, color = '#eceff1', seriesName, seriesTotal } = props
  const countSeries = (series - 80) * 5

  const seriesToString = countSeries.toString()
  const seriesSplit = seriesToString.split('.')
  const seriesString = series === 100 ? '1' : '0.' + seriesSplit[0]
  const seriesNum = parseFloat(seriesString)

  // ** Hook
  const theme = useTheme()

  const options: ApexOptions = {
    chart: {
      sparkline: { enabled: true }
    },
    stroke: { lineCap: 'round' },
    colors: [hexToRGBA(color, seriesNum)],
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    plotOptions: {
      radialBar: {
        endAngle: 90,
        startAngle: -90,
        hollow: { size: '50%' },
        track: {
          strokeWidth: '40%',
          background: hexToRGBA(theme.palette.customColors.trackBg, 1)
        },
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: -3,
            fontWeight: 600,
            color: theme.palette.text.primary,
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.typography.h4.fontSize as string,

            formatter: function () {
              return series + '%'
            }
          }
        }
      }
    },
    grid: {
      padding: {
        bottom: 9
      }
    },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        options: {
          chart: { height: 199 }
        }
      },
      {
        breakpoint: 430,
        options: {
          chart: { height: 150 }
        }
      }
    ]
  }

  return (
    <Card>
      <CardContent>
        <Typography variant='h5' sx={{ textAlign: 'center', color: 'success.main' }}>
          {seriesName}
        </Typography>
        <Typography variant='body2' sx={{ textAlign: 'center', color: 'success.main', marginBottom: -5 }}>
          ({seriesTotal})
        </Typography>
        <ReactApexcharts type='radialBar' height={200} series={[countSeries]} options={options} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant='body2' sx={{ color: 'text.disabled', paddingLeft: 2 }}>
            80
          </Typography>
          <Typography variant='body2' sx={{ color: 'text.disabled', paddingRight: 2 }}>
            100
          </Typography>
        </div>
      </CardContent>
    </Card>
  )
}

export default AllKanwil
