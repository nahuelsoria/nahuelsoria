import useSWR from "swr"

interface ExchangeRateData {
  oficial: {
    value_avg: number
    value_sell: number
    value_buy: number
  }
  blue: {
    value_avg: number
    value_sell: number
    value_buy: number
  }
  oficial_euro: {
    value_avg: number
    value_sell: number
    value_buy: number
  }
  blue_euro: {
    value_avg: number
    value_sell: number
    value_buy: number
  }
  last_update: string
}

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error("Failed to fetch exchange rate")
  return res.json()
}

export function useExchangeRate() {
  const { data, error, isLoading } = useSWR<ExchangeRateData>("https://api.bluelytics.com.ar/v2/latest", fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000, // Actualizar cada minuto
    focusThrottleInterval: 300000, // No refetchar al enfocar por 5 min
  })

  return {
    rate: data?.blue.value_avg || 1,
    isLoading,
    error: !!error,
  }
}
