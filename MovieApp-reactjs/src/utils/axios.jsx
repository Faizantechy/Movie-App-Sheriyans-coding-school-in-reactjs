import axios from 'axios'

const Instance = axios.create({

    
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Yzg1ZjgxNDIwNTMyMzMxOWM0NzZjMDUxMjkzYjk4NyIsIm5iZiI6MTczMjI5NTQzMi40OTE1MTQyLCJzdWIiOiI2NzNhZDgwNjJjMGI3ZmQyMDM0YWI2ZmQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.4yjCkGvLllGxAYu87NNrps0Uw_M9XXnWHeFX9vqjwD8'
      }
   

})

export default Instance;