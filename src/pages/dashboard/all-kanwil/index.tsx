import Grid from '@mui/material/Grid'
import AllKanwil from 'src/views/dashboards/All-kanwil'

import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import { useEffect, useState } from 'react'

// import { getRegionPercentage } from 'src/services/dashboard/all-kanwil.service'

const EcommerceDashboard = () => {
  const [region, setRegion] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/inms-api/list/region/percentage', {
      method: 'POST',
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsd2lAZ21haWwuY29tIiwiZXhwIjoxNjk2NTA4NTgyLCJyb2xlX2lkIjoiMSIsInVzZXJpZCI6IjI2MTUiLCJ1c2VybmFtZSI6ImFsd2kifQ.vowfdJYsudgqKWq_asxjpQdskXI5oAZbuNTK2XhW204'
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setRegion(data.percentage)
      })
  }, [])

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        {region.map((item, index) => {
          if (item['persentasi'] < 93) {
            return (
              <Grid item xs={2} key={index}>
                <AllKanwil series={item['persentasi']} seriesName={item['nama_kanwil']} color='#f44336' />
              </Grid>
            )
          } else if (item['persentasi'] >= 93 && item['persentasi'] < 97) {
            return (
              <Grid item xs={2} key={index}>
                <AllKanwil series={item['persentasi']} seriesName={item['nama_kanwil']} color='#ffeb3b' />
              </Grid>
            )
          } else {
            return (
              <Grid item xs={2} key={index}>
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

export default EcommerceDashboard
