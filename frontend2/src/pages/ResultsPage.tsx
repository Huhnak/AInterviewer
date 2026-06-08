import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from 'recharts' 

const data = [{ name: 'score', value: 85 }]

const skills = [
  { name: 'React', value: 90 },
  { name: 'JavaScript', value: 82 },
  { name: 'Algorithms', value: 74 },
]

const ResultsPage = () => {
  return (
    <div className='grid grid-cols-2 gap-6'>
      <div className='bg-card rounded-3xl p-8 h-[420px]'>
        <h2 className='text-2xl font-bold mb-5'>Общий результат</h2>
        <ResponsiveContainer>
          <RadialBarChart innerRadius='70%' outerRadius='100%' data={data}>
            <RadialBar dataKey='value' />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>

      <div className='bg-card rounded-3xl p-8 h-[420px]'>
        <h2 className='text-2xl font-bold mb-5'>Навыки</h2>

        <ResponsiveContainer>
          <BarChart data={skills}>
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Bar dataKey='value' radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default ResultsPage