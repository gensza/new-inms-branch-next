import Grid from '@mui/material/Grid'
import AllKanwil from 'src/views/dashboards/AllKanwil'

import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next/types'
import inmsApiConfig from 'src/utils/inmsApiConfig'

type percentageProps = {
  kode_kanwil: string
  nama_kanwil: string
  persentasi: number
  total: number
}

const AllKanwilDashboard = (props: { region: percentageProps[] }) => {
  const { region } = props

  const { push } = useRouter()

  useEffect(() => {
    const interval = setInterval(() => {
      push('/dashboard/all_kanwil')
    }, 10000)

    return () => clearInterval(interval)
  })

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        {region.map((item, index) => {
          if (item['persentasi'] < 93) {
            return (
              <Grid item xs={6} md={4} lg={2} key={index}>
                <AllKanwil
                  series={item['persentasi']}
                  seriesName={item['nama_kanwil']}
                  seriesTotal={item['total']}
                  color='#f44336'
                />
              </Grid>
            )
          } else if (item['persentasi'] >= 93 && item['persentasi'] <= 94.99) {
            return (
              <Grid item xs={6} md={4} lg={2} key={index}>
                <AllKanwil
                  series={item['persentasi']}
                  seriesName={item['nama_kanwil']}
                  seriesTotal={item['total']}
                  color='#ffeb3b'
                />
              </Grid>
            )
          } else if (item['persentasi'] >= 95 && item['persentasi'] <= 97.99) {
            return (
              <Grid item xs={6} md={4} lg={2} key={index}>
                <AllKanwil
                  series={item['persentasi']}
                  seriesName={item['nama_kanwil']}
                  seriesTotal={item['total']}
                  color='#81c784'
                />
              </Grid>
            )
          } else {
            return (
              <Grid item xs={6} md={4} lg={2} key={index}>
                <AllKanwil
                  series={item['persentasi']}
                  seriesName={item['nama_kanwil']}
                  seriesTotal={item['total']}
                  color='#4caf50'
                />
              </Grid>
            )
          }
        })}
      </Grid>
    </ApexChartWrapper>
  )
}

export default AllKanwilDashboard

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await inmsApiConfig.post('/list/region/percentage')

    return { props: { region: response.data.percentage } }
  } catch (error) {
    return { props: { error: 'Something went wrong' } }
  }
}
