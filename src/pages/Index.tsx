import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const propertyData = {
  name: 'Вилла "Тропический рай"',
  location: 'Камала, Пхукет',
  type: '3-спальная вилла с бассейном',
  area: '250 м²',
  image: 'https://cdn.poehali.dev/projects/10bc5f35-691a-4047-b2fe-12bbd6ee6cfb/files/66b23697-b030-468b-9ca0-3d23c9e143ee.jpg',
  description: 'Роскошная вилла с панорамным видом на Андаманское море. Включает современный дизайн, приватный бассейн, тропический сад и полную меблировку премиум-класса.',
  amenities: ['Бассейн', 'Кондиционер', 'Wi-Fi', 'Кухня', 'Парковка', 'Терраса'],
};

const bookingsData = [
  { id: 1, guest: 'Иванов А.', start: '2025-11-01', startTime: '14:00', end: '2025-11-07', endTime: '12:00', days: 7, source: 'Airbnb', status: 'completed' },
  { id: 2, guest: 'Смирнова М.', start: '2025-11-08', startTime: '15:00', end: '2025-11-13', endTime: '11:00', days: 6, source: 'Booking', status: 'completed' },
  { id: 3, guest: 'Петров Д.', start: '2025-11-14', startTime: '16:00', end: '2025-11-20', endTime: '10:00', days: 7, source: 'Vrbo', status: 'active' },
  { id: 4, guest: 'Козлов В.', start: '2025-11-21', startTime: '14:00', end: '2025-11-27', endTime: '12:00', days: 7, source: 'Agoda', status: 'upcoming' },
  { id: 5, guest: 'Морозова Е.', start: '2025-12-01', startTime: '13:00', end: '2025-12-07', endTime: '11:00', days: 7, source: 'Expedia', status: 'upcoming' },
  { id: 6, guest: 'Кузнецов П.', start: '2025-12-08', startTime: '15:00', end: '2025-12-14', endTime: '12:00', days: 7, source: 'KOYA', status: 'upcoming' },
  { id: 7, guest: 'Лебедева О.', start: '2025-12-15', startTime: '14:00', end: '2025-12-21', endTime: '10:00', days: 7, source: 'Airbnb', status: 'upcoming' },
  { id: 8, guest: 'Соколов И.', start: '2025-12-22', startTime: '16:00', end: '2025-12-28', endTime: '11:00', days: 7, source: 'Booking', status: 'upcoming' },
];

const sourceColors: Record<string, { bg: string; border: string; text: string }> = {
  Airbnb: { bg: 'bg-[#FF5A5F]', border: 'border-[#FF5A5F]', text: 'text-[#FF5A5F]' },
  Booking: { bg: 'bg-[#003580]', border: 'border-[#003580]', text: 'text-[#003580]' },
  Vrbo: { bg: 'bg-[#0D7EA3]', border: 'border-[#0D7EA3]', text: 'text-[#0D7EA3]' },
  Agoda: { bg: 'bg-[#D71149]', border: 'border-[#D71149]', text: 'text-[#D71149]' },
  Expedia: { bg: 'bg-[#FFCB00]', border: 'border-[#FFCB00]', text: 'text-[#FFCB00]' },
  KOYA: { bg: 'bg-[#7C3AED]', border: 'border-[#7C3AED]', text: 'text-[#7C3AED]' },
};

const accessLogs = [
  { id: 1, date: '2025-11-23 14:30', type: 'Гость', name: 'Петров Д.', action: 'Вход', door: 'Главная дверь' },
  { id: 2, date: '2025-11-23 09:15', type: 'Клининг', name: 'Мария', action: 'Вход', door: 'Главная дверь' },
  { id: 3, date: '2025-11-23 11:45', type: 'Клининг', name: 'Мария', action: 'Выход', door: 'Главная дверь' },
  { id: 4, date: '2025-11-22 18:20', type: 'Гость', name: 'Петров Д.', action: 'Выход', door: 'Главная дверь' },
  { id: 5, date: '2025-11-22 10:00', type: 'Клининг', name: 'Анна', action: 'Вход', door: 'Главная дверь' },
  { id: 6, date: '2025-11-22 12:30', type: 'Клининг', name: 'Анна', action: 'Выход', door: 'Главная дверь' },
  { id: 7, date: '2025-11-21 16:45', type: 'Гость', name: 'Петров Д.', action: 'Вход', door: 'Главная дверь' },
];

const revenueData = [
  { month: 'Июль', revenue: 185000, expenses: 12000 },
  { month: 'Август', revenue: 195000, expenses: 8000 },
  { month: 'Сентябрь', revenue: 178000, expenses: 25000 },
  { month: 'Октябрь', revenue: 205000, expenses: 15000 },
  { month: 'Ноябрь', revenue: 220000, expenses: 10000 },
  { month: 'Декабрь', revenue: 240000, expenses: 18000 },
];

const expensesList = [
  { id: 1, date: '2025-11-15', category: 'Ремонт кондиционера', amount: 8500, status: 'paid' },
  { id: 2, date: '2025-10-28', category: 'Замена фильтра бассейна', amount: 6200, status: 'paid' },
  { id: 3, date: '2025-10-10', category: 'Покраска фасада', amount: 8800, status: 'paid' },
  { id: 4, date: '2025-11-20', category: 'Ремонт забора', amount: 1500, status: 'pending' },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('property');

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalExpenses = revenueData.reduce((sum, item) => sum + item.expenses, 0);
  const netProfit = totalRevenue - totalExpenses;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">Панель управления</h1>
              <p className="text-sm text-muted-foreground mt-1">{propertyData.name}</p>
            </div>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              Активно
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-white">
            <TabsTrigger value="property" className="flex items-center gap-2">
              <Icon name="Home" size={18} />
              <span className="hidden sm:inline">Объект</span>
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center gap-2">
              <Icon name="Calendar" size={18} />
              <span className="hidden sm:inline">Бронирования</span>
            </TabsTrigger>
            <TabsTrigger value="access" className="flex items-center gap-2">
              <Icon name="Lock" size={18} />
              <span className="hidden sm:inline">Доступ</span>
            </TabsTrigger>
            <TabsTrigger value="finance" className="flex items-center gap-2">
              <Icon name="DollarSign" size={18} />
              <span className="hidden sm:inline">Финансы</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="property" className="animate-fade-in">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Информация об объекте</CardTitle>
                  <CardDescription>Основные характеристики недвижимости</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video rounded-lg overflow-hidden mb-6">
                    <img
                      src={propertyData.image}
                      alt={propertyData.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{propertyData.name}</h3>
                      <div className="flex items-center gap-2 text-muted-foreground mb-4">
                        <Icon name="MapPin" size={16} />
                        <span>{propertyData.location}</span>
                      </div>
                    </div>
                    <p className="text-foreground/80">{propertyData.description}</p>
                    <div className="flex flex-wrap gap-2 pt-4">
                      {propertyData.amenities.map((amenity) => (
                        <Badge key={amenity} variant="secondary">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Характеристики</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b">
                      <span className="text-muted-foreground">Тип</span>
                      <span className="font-medium">{propertyData.type}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b">
                      <span className="text-muted-foreground">Площадь</span>
                      <span className="font-medium">{propertyData.area}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b">
                      <span className="text-muted-foreground">Локация</span>
                      <span className="font-medium">{propertyData.location}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Статистика за месяц</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Заездов</span>
                      <span className="text-2xl font-bold text-primary">5</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Загрузка</span>
                      <span className="text-2xl font-bold text-primary">87%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Доход</span>
                      <span className="text-2xl font-bold text-primary">220 000₽</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Диаграмма бронирований</CardTitle>
                <CardDescription>График заездов гостей в стиле Gantt-chart</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 flex flex-wrap gap-3">
                  {Object.entries(sourceColors).map(([source, colors]) => (
                    <div key={source} className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded ${colors.bg}`}></div>
                      <span className="text-sm">{source}</span>
                    </div>
                  ))}
                </div>

                <div className="overflow-x-auto">
                  <div className="min-w-[800px]">
                    <div className="grid grid-cols-[200px_1fr] gap-4 mb-2">
                      <div className="font-semibold text-sm text-muted-foreground">Гость / Источник</div>
                      <div className="grid grid-cols-30 gap-px">
                        {Array.from({ length: 30 }, (_, i) => (
                          <div
                            key={i}
                            className="text-center text-xs text-muted-foreground"
                          >
                            {i + 1}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      {bookingsData.map((booking) => {
                        const startDate = new Date(booking.start);
                        const endDate = new Date(booking.end);
                        const startDay = startDate.getDate();
                        const colors = sourceColors[booking.source];

                        return (
                          <div key={booking.id} className="grid grid-cols-[200px_1fr] gap-4 items-center">
                            <div className="flex flex-col">
                              <span className="font-medium text-sm">{booking.guest}</span>
                              <Badge
                                className={`w-fit text-xs mt-1 ${colors.bg} ${colors.border} border text-white`}
                              >
                                {booking.source}
                              </Badge>
                            </div>

                            <div className="relative h-12 bg-gray-50 rounded border">
                              <div className="absolute inset-0 grid grid-cols-30 gap-px">
                                {Array.from({ length: 30 }, (_, i) => (
                                  <div key={i} className="border-r border-gray-200"></div>
                                ))}
                              </div>

                              <div
                                className={`absolute h-full ${colors.bg} rounded flex items-center justify-between px-2 text-white text-xs font-medium shadow-md hover:shadow-lg transition-shadow`}
                                style={{
                                  left: `${((startDay - 1) / 30) * 100}%`,
                                  width: `${(booking.days / 30) * 100}%`,
                                }}
                              >
                                <span className="bg-white/20 px-1.5 py-0.5 rounded backdrop-blur-sm">
                                  {booking.startTime}
                                </span>
                                <span className="bg-white/20 px-1.5 py-0.5 rounded backdrop-blur-sm">
                                  {booking.endTime}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="font-semibold mb-4">Статистика по источникам</h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {Object.entries(
                      bookingsData.reduce((acc, booking) => {
                        acc[booking.source] = (acc[booking.source] || 0) + 1;
                        return acc;
                      }, {} as Record<string, number>)
                    ).map(([source, count]) => {
                      const colors = sourceColors[source];
                      return (
                        <Card key={source} className="hover:shadow-md transition-shadow">
                          <CardContent className="pt-6">
                            <div className="text-center">
                              <div className={`w-12 h-12 rounded-full ${colors.bg} mx-auto mb-3 flex items-center justify-center`}>
                                <Icon name="Calendar" size={24} className="text-white" />
                              </div>
                              <div className={`text-3xl font-bold ${colors.text}`}>{count}</div>
                              <div className="text-sm text-muted-foreground mt-1">{source}</div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="access" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Журнал доступа</CardTitle>
                <CardDescription>История входов через умные замки</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {accessLogs.map((log) => (
                    <div
                      key={log.id}
                      className="flex items-center justify-between p-4 bg-white border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            log.type === 'Гость' ? 'bg-primary/10' : 'bg-secondary'
                          }`}
                        >
                          <Icon
                            name={log.type === 'Гость' ? 'User' : 'Briefcase'}
                            size={20}
                            className={log.type === 'Гость' ? 'text-primary' : 'text-secondary-foreground'}
                          />
                        </div>
                        <div>
                          <div className="font-medium">{log.name}</div>
                          <div className="text-sm text-muted-foreground">{log.type}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 justify-end">
                          <Badge variant={log.action === 'Вход' ? 'default' : 'outline'}>
                            {log.action === 'Вход' ? (
                              <Icon name="LogIn" size={14} className="mr-1" />
                            ) : (
                              <Icon name="LogOut" size={14} className="mr-1" />
                            )}
                            {log.action}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">{log.date}</div>
                        <div className="text-xs text-muted-foreground">{log.door}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-3xl font-bold text-primary">7</div>
                      <div className="text-sm text-muted-foreground mt-1">Всего записей</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-3xl font-bold text-primary">4</div>
                      <div className="text-sm text-muted-foreground mt-1">Входов гостей</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-3xl font-bold text-primary">3</div>
                      <div className="text-sm text-muted-foreground mt-1">Клининг</div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="finance" className="animate-fade-in">
            <div className="grid gap-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Общий доход</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary">{totalRevenue.toLocaleString('ru-RU')} ₽</div>
                    <p className="text-sm text-muted-foreground mt-1">За 6 месяцев</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Расходы</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-destructive">{totalExpenses.toLocaleString('ru-RU')} ₽</div>
                    <p className="text-sm text-muted-foreground mt-1">Ремонт и обслуживание</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Чистая прибыль</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary">{netProfit.toLocaleString('ru-RU')} ₽</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      +{((netProfit / totalRevenue) * 100).toFixed(1)}% маржа
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>График доходности</CardTitle>
                  <CardDescription>Доходы и расходы по месяцам</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E9DFD3" />
                      <XAxis dataKey="month" stroke="#345E5B" />
                      <YAxis stroke="#345E5B" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#ffffff',
                          border: '1px solid #E9DFD3',
                          borderRadius: '8px',
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#345E5B"
                        strokeWidth={3}
                        name="Доход"
                        dot={{ fill: '#345E5B', r: 5 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="expenses"
                        stroke="#D7C4AF"
                        strokeWidth={3}
                        name="Расходы"
                        dot={{ fill: '#D7C4AF', r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>История расходов</CardTitle>
                  <CardDescription>Ремонт и обслуживание объекта</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {expensesList.map((expense) => (
                      <div
                        key={expense.id}
                        className="flex items-center justify-between p-4 border rounded-lg bg-white hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                            <Icon name="Wrench" size={20} className="text-destructive" />
                          </div>
                          <div>
                            <div className="font-medium">{expense.category}</div>
                            <div className="text-sm text-muted-foreground">{expense.date}</div>
                          </div>
                        </div>
                        <div className="text-right flex items-center gap-4">
                          <div className="text-lg font-semibold text-destructive">
                            -{expense.amount.toLocaleString('ru-RU')} ₽
                          </div>
                          <Badge variant={expense.status === 'paid' ? 'default' : 'outline'}>
                            {expense.status === 'paid' ? 'Оплачено' : 'В ожидании'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Итого расходов:</span>
                      <span className="text-xl font-bold text-destructive">
                        {expensesList.reduce((sum, e) => sum + e.amount, 0).toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;