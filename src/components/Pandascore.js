import axios from 'axios'

export default axios.create({
    baseURL: 'https://api.pandascore.co/',
    params: {
        token: 'KTWkw8TNb1BEslmnPENt5W53-M2_felAwT1SMscA78X0JTcw5fo'
        // token: 'fgMRHcZ7cSjqE1ykSqh0RCsdIa7ZSdyZxDgj9WYIENSDsZT2qlA'
    }
})
