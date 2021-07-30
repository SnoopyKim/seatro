// resources/testData.js 참고
import testData from './../resources/testData';

const days = ['일', '월', '화', '수', '목', '금', '토', '일']

export async function getStations(dev=true) {
    if (dev) return testData.stations
    try {
        const response = await fetch('http://nonge.iptime.org:8841/andmlalgkswnth/mog_api/get_stations')
        if (response.status === 200) {
            const { data } = await response.json()
            console.log("서버 호출 성공", data)
            return data
        } else {
            console.log("서버 오류로 인해 테스트 데이터를 가져옵니다")
            return testData.stations
        }
    } catch {
        console.log("서버 오류로 인해 테스트 데이터를 가져옵니다")
        return testData.stations
    }
}

export async function getStationInfo(station_name, dev=true) {
    if (dev) return testData.stationInfo
    try {
        const now = new Date()
        const month = now.getMonth()+1 < 10 ? '0'+(now.getMonth()+1).toString() : (now.getMonth()+1).toString() 
        const date = now.getFullYear().toString() + '06'
        const day = days[now.getDay()]
        const time = now.getHours()
        const body = JSON.stringify({
            date: date,
            day: '월',
            station_name: station_name,
            time: 1
        })
        console.log(body)

        const response = await fetch('http://nonge.iptime.org:8841/andmlalgkswnth/mog_api/get_station_info', {
            method: 'POST',
            body
        })
        if (response.status === 200) {
            const { data } = await response.json()
            console.log("서버 호출 성공", data)
            return data
        } else {
            console.log("서버 오류로 인해 테스트 데이터를 가져옵니다")
            return testData.stationInfo
        }
    } catch {
        console.log("서버 오류로 인해 테스트 데이터를 가져옵니다")
        return testData.stationInfo
    }
}