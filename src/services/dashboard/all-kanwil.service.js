export const getRegionPercentage = () => {
  fetch('http://localhost:8080/inms-api/list/region/percentage', {
    method: 'POST',
    headers: {
      Authorization:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsd2lAZ21haWwuY29tIiwiZXhwIjoxNjk2NTA4NTgyLCJyb2xlX2lkIjoiMSIsInVzZXJpZCI6IjI2MTUiLCJ1c2VybmFtZSI6ImFsd2kifQ.vowfdJYsudgqKWq_asxjpQdskXI5oAZbuNTK2XhW204'
    }
  })
    .then(res => res.json())
    .then(data => {
      return data
    })
}
