import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Thermometer, 
  Droplets, 
  Lightbulb, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Zap,
  Gauge,
  Settings,
  TrendingUp,
  Calendar,
  MapPin,
  Users,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  Database,
  Wifi,
  Shield,
  FileText,
  Bell,
  Menu,
  X,
  Home,
  Monitor,
  Wrench,
  Calculator,
  History,
  ChevronRight,
  Search,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';

const GTBDashboard = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedBuilding, setSelectedBuilding] = useState('all');
  const [timeRange, setTimeRange] = useState('24h');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const buildings = [
    {
      id: 'ecole_centre',
      name: 'École du Centre',
      type: 'École',
      gateway: 'EG410',
      status: 'online',
      temperature: 21.5,
      humidity: 45,
      power: 15.2,
      occupancy: 185,
      maxOccupancy: 200,
      alerts: 0,
      zones: ['Salle de classe A', 'Salle de classe B', 'Réfectoire', 'Gymnase'],
      efficiency: 92,
      lastUpdate: '2 min'
    },
    {
      id: 'piscine_municipale',
      name: 'Piscine Municipale',
      type: 'Piscine',
      gateway: 'EG500',
      status: 'online',
      temperature: 26.8,
      humidity: 68,
      power: 45.7,
      occupancy: 32,
      maxOccupancy: 80,
      alerts: 1,
      zones: ['Bassin principal', 'Vestiaires', 'Local technique', 'Accueil'],
      efficiency: 87,
      lastUpdate: '1 min'
    },
    {
      id: 'gymnase_sport',
      name: 'Gymnase Municipal',
      type: 'Gymnase',
      gateway: 'EG324',
      status: 'maintenance',
      temperature: 19.2,
      humidity: 42,
      power: 8.3,
      occupancy: 0,
      maxOccupancy: 150,
      alerts: 2,
      zones: ['Terrain principal', 'Vestiaires', 'Gradins', 'Bureau'],
      efficiency: 65,
      lastUpdate: '2h'
    },
    {
      id: 'salle_fetes',
      name: 'Salle des Fêtes',
      type: 'Salle des Fêtes',
      gateway: 'EG410',
      status: 'online',
      temperature: 20.1,
      humidity: 48,
      power: 12.1,
      occupancy: 0,
      maxOccupancy: 300,
      alerts: 0,
      zones: ['Grande salle', 'Cuisine', 'Scène', 'Stockage'],
      efficiency: 94,
      lastUpdate: '3 min'
    },
    {
      id: 'mairie',
      name: 'Hôtel de Ville',
      type: 'Administration',
      gateway: 'EG500',
      status: 'online',
      temperature: 22.0,
      humidity: 44,
      power: 18.9,
      occupancy: 45,
      maxOccupancy: 60,
      alerts: 0,
      zones: ['Accueil', 'Bureaux étage 1', 'Bureaux étage 2', 'Salle conseil'],
      efficiency: 89,
      lastUpdate: '1 min'
    }
  ];

  const sidebarItems = [
    { id: 'dashboard', label: 'Vue d\'ensemble', icon: Home, color: 'blue' },
    { id: 'buildings', label: 'Bâtiments', icon: Building2, color: 'indigo' },
    { id: 'monitoring', label: 'Supervision', icon: Monitor, color: 'green' },
    { id: 'energy', label: 'Énergie', icon: Zap, color: 'yellow' },
    { id: 'alerts', label: 'Alertes', icon: Bell, color: 'red' },
    { id: 'maintenance', label: 'Maintenance', icon: Wrench, color: 'orange' },
    { id: 'analytics', label: 'Analyses', icon: BarChart3, color: 'purple' },
    { id: 'planning', label: 'Planification', icon: Calendar, color: 'pink' },
    { id: 'reports', label: 'Rapports', icon: FileText, color: 'gray' },
    { id: 'system', label: 'Système', icon: Database, color: 'cyan' },
    { id: 'settings', label: 'Paramètres', icon: Settings, color: 'slate' }
  ];

  const recentAlerts = [
    {
      id: 1,
      building: 'Piscine Municipale',
      zone: 'Bassin principal',
      type: 'Température',
      message: 'Température de l\'eau élevée (28.5°C)',
      severity: 'warning',
      time: '14:30',
      status: 'active'
    },
    {
      id: 2,
      building: 'Gymnase Municipal',
      zone: 'Local technique',
      type: 'Système',
      message: 'Passerelle EG324 en maintenance',
      severity: 'info',
      time: '09:15',
      status: 'acknowledged'
    },
    {
      id: 3,
      building: 'Gymnase Municipal',
      zone: 'Vestiaires',
      type: 'Éclairage',
      message: 'Défaut éclairage zone vestiaires',
      severity: 'error',
      time: '08:45',
      status: 'active'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-emerald-500';
      case 'offline': return 'bg-red-500';
      case 'maintenance': return 'bg-amber-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusGlow = (status) => {
    switch (status) {
      case 'online': return 'shadow-emerald-500/30';
      case 'offline': return 'shadow-red-500/30';
      case 'maintenance': return 'shadow-amber-500/30';
      default: return 'shadow-gray-500/30';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'error': return 'bg-gradient-to-r from-red-50 to-red-100 text-red-800 border-red-200/50';
      case 'warning': return 'bg-gradient-to-r from-amber-50 to-amber-100 text-amber-800 border-amber-200/50';
      case 'info': return 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 border-blue-200/50';
      default: return 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 border-gray-200/50';
    }
  };

  const totalPower = buildings.reduce((sum, building) => sum + building.power, 0);
  const totalAlerts = buildings.reduce((sum, building) => sum + building.alerts, 0);
  const onlineBuildings = buildings.filter(b => b.status === 'online').length;
  const avgEfficiency = buildings.reduce((sum, building) => sum + building.efficiency, 0) / buildings.length;

  const MetricCard = ({ title, value, unit, icon: Icon, color, trend, subtitle }) => (
    <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-2xl shadow-slate-300/40 p-6 border border-white/30 hover:shadow-3xl hover:shadow-slate-400/50 hover:bg-white/70 transition-all duration-500 relative overflow-hidden group">
      {/* Effet de brillance au hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br from-${color}-500 to-${color}-600 shadow-xl shadow-${color}-500/40`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          {trend && (
            <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${trend > 0 ? 'bg-emerald-100/80 text-emerald-700' : 'bg-red-100/80 text-red-700'}`}>
              <TrendingUp className={`h-3 w-3 mr-1 ${trend < 0 ? 'rotate-180' : ''}`} />
              {Math.abs(trend)}%
            </div>
          )}
        </div>
        <div className="space-y-1">
          <p className="text-2xl font-bold text-slate-800">{value}<span className="text-lg font-normal text-slate-500 ml-1">{unit}</span></p>
          <p className="text-sm font-medium text-slate-600">{title}</p>
          {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
        </div>
      </div>
    </div>
  );

  const BuildingCard = ({ building }) => (
    <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-2xl shadow-slate-300/40 border border-white/30 hover:shadow-3xl hover:shadow-slate-400/50 hover:bg-white/70 transition-all duration-500 overflow-hidden group relative">
      {/* Effet de brillance */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
      <div className="p-6 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(building.status)} shadow-lg ${getStatusGlow(building.status)}`}></div>
            <div>
              <h3 className="font-semibold text-slate-800 text-lg">{building.name}</h3>
              <p className="text-sm text-slate-500">{building.type} • {building.gateway}</p>
            </div>
          </div>
          {building.alerts > 0 && (
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg shadow-red-500/30">
              {building.alerts}
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-3 border border-red-100/50">
            <div className="flex items-center space-x-2">
              <Thermometer className="h-4 w-4 text-red-500" />
              <span className="text-xs text-red-600 font-medium">Température</span>
            </div>
            <p className="text-lg font-bold text-slate-800 mt-1">{building.temperature}°C</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-3 border border-blue-100/50">
            <div className="flex items-center space-x-2">
              <Droplets className="h-4 w-4 text-blue-500" />
              <span className="text-xs text-blue-600 font-medium">Humidité</span>
            </div>
            <p className="text-lg font-bold text-slate-800 mt-1">{building.humidity}%</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-3 border border-yellow-100/50">
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span className="text-xs text-yellow-600 font-medium">Énergie</span>
            </div>
            <p className="text-lg font-bold text-slate-800 mt-1">{building.power} kW</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3 border border-green-100/50">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-green-500" />
              <span className="text-xs text-green-600 font-medium">Occupation</span>
            </div>
            <p className="text-lg font-bold text-slate-800 mt-1">{building.occupancy}/{building.maxOccupancy}</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-12 bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${building.efficiency >= 90 ? 'bg-gradient-to-r from-green-400 to-green-500' : building.efficiency >= 70 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' : 'bg-gradient-to-r from-red-400 to-red-500'}`}
                style={{ width: `${building.efficiency}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-500">{building.efficiency}% efficacité</span>
          </div>
          <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderDashboardView = () => (
    <div className="space-y-8">
      {/* Métriques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Bâtiments actifs"
          value={onlineBuildings}
          unit={`/${buildings.length}`}
          icon={CheckCircle}
          color="emerald"
          trend={2.5}
        />
        <MetricCard
          title="Consommation"
          value={totalPower.toFixed(1)}
          unit="kW"
          icon={Zap}
          color="blue"
          trend={-5.2}
          subtitle="vs hier"
        />
        <MetricCard
          title="Alertes actives"
          value={totalAlerts}
          unit=""
          icon={AlertTriangle}
          color="amber"
        />
        <MetricCard
          title="Efficacité moyenne"
          value={avgEfficiency.toFixed(0)}
          unit="%"
          icon={TrendingUp}
          color="purple"
          trend={1.8}
        />
      </div>

      {/* Graphique de consommation */}
      <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-2xl shadow-slate-300/40 border border-white/30 p-6 relative overflow-hidden group">
        {/* Effet lumineux de fond */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-800">Consommation énergétique</h2>
            <div className="flex items-center space-x-3">
              <select className="border-0 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 text-sm font-medium text-slate-700 shadow-lg shadow-slate-200/50 focus:ring-2 focus:ring-blue-500 transition-all">
                <option>Dernières 24h</option>
                <option>Cette semaine</option>
                <option>Ce mois</option>
              </select>
            </div>
          </div>
          <div className="h-64 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 backdrop-blur-sm rounded-xl border border-blue-100/50 flex items-center justify-center relative overflow-hidden">
            {/* Particules de fond */}
            <div className="absolute top-4 left-4 w-2 h-2 bg-blue-400/30 rounded-full animate-pulse"></div>
            <div className="absolute bottom-6 right-8 w-1.5 h-1.5 bg-purple-400/30 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-cyan-400/30 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
            
            <div className="text-center z-10">
              <LineChart className="h-16 w-16 text-blue-400 mx-auto mb-3" />
              <p className="text-slate-700 font-medium">Graphique de consommation</p>
              <p className="text-sm text-slate-500">Données temps réel</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grille des bâtiments */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">État des bâtiments</h2>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30">
            <RefreshCw className="h-4 w-4" />
            <span>Actualiser</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {buildings.map((building) => (
            <BuildingCard key={building.id} building={building} />
          ))}
        </div>
      </div>
    </div>
  );

  const renderBuildingsView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg shadow-gray-100/50 border border-gray-100/50">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Gestion des bâtiments</h2>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Rechercher..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-100">
          {buildings.map((building) => (
            <div key={building.id} className="p-6 hover:bg-gray-50/50 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className={`w-4 h-4 rounded-full ${getStatusColor(building.status)} shadow-lg ${getStatusGlow(building.status)}`}></div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{building.name}</h3>
                    <p className="text-sm text-gray-500">{building.type} • {building.gateway} • Mis à jour il y a {building.lastUpdate}</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-600/30">
                  Détails
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-3 border border-red-100/50">
                  <div className="flex items-center space-x-2 mb-1">
                    <Thermometer className="h-4 w-4 text-red-500" />
                    <span className="text-xs text-red-600 font-medium">Température</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{building.temperature}°C</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-3 border border-blue-100/50">
                  <div className="flex items-center space-x-2 mb-1">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    <span className="text-xs text-blue-600 font-medium">Humidité</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{building.humidity}%</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-3 border border-yellow-100/50">
                  <div className="flex items-center space-x-2 mb-1">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    <span className="text-xs text-yellow-600 font-medium">Consommation</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{building.power} kW</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3 border border-green-100/50">
                  <div className="flex items-center space-x-2 mb-1">
                    <Users className="h-4 w-4 text-green-500" />
                    <span className="text-xs text-green-600 font-medium">Occupation</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{building.occupancy}/{building.maxOccupancy}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Zones surveillées</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {building.zones.map((zone, index) => (
                    <div key={index} className="bg-white rounded-lg px-3 py-2 text-xs font-medium text-gray-700 border border-gray-200/50 hover:border-blue-200 hover:bg-blue-50 transition-colors cursor-pointer">
                      {zone}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMonitoringView = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg shadow-gray-100/50 border border-gray-100/50 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Température temps réel</h3>
          <div className="space-y-4">
            {buildings.map((building) => (
              <div key={building.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl border border-gray-200/50">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(building.status)} shadow-lg ${getStatusGlow(building.status)}`}></div>
                  <span className="font-medium text-gray-700">{building.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-red-400 to-red-500 h-2 rounded-full shadow-sm" 
                      style={{ width: `${(building.temperature / 30) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-gray-900 min-w-[3rem]">{building.temperature}°C</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg shadow-gray-100/50 border border-gray-100/50 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Consommation énergétique</h3>
          <div className="space-y-4">
            {buildings.map((building) => (
              <div key={building.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-xl border border-blue-200/50">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(building.status)} shadow-lg ${getStatusGlow(building.status)}`}></div>
                  <span className="font-medium text-gray-700">{building.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-blue-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-400 to-blue-500 h-2 rounded-full shadow-sm" 
                      style={{ width: `${(building.power / 50) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-gray-900 min-w-[3rem]">{building.power} kW</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg shadow-gray-100/50 border border-gray-100/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">État des passerelles Elastel</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-6 border border-emerald-200/50">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900">EG410</h4>
              <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/30"></div>
            </div>
            <p className="text-sm text-gray-600 mb-2">École du Centre, Salle des Fêtes</p>
            <p className="text-xs text-emerald-600 font-medium">Dernière comm: Il y a 30s</p>
            <div className="mt-3 p-2 bg-white rounded-lg border border-emerald-200/50">
              <p className="text-xs text-gray-500">IP: 192.168.1.101</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-6 border border-emerald-200/50">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900">EG500</h4>
              <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/30"></div>
            </div>
            <p className="text-sm text-gray-600 mb-2">Piscine, Hôtel de Ville</p>
            <p className="text-xs text-emerald-600 font-medium">Dernière comm: Il y a 45s</p>
            <div className="mt-3 p-2 bg-white rounded-lg border border-emerald-200/50">
              <p className="text-xs text-gray-500">IP: 192.168.1.102</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-200/50">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900">EG324</h4>
              <div className="w-3 h-3 bg-amber-500 rounded-full shadow-lg shadow-amber-500/30"></div>
            </div>
            <p className="text-sm text-gray-600 mb-2">Gymnase Municipal</p>
            <p className="text-xs text-amber-600 font-medium">Maintenance programmée</p>
            <div className="mt-3 p-2 bg-white rounded-lg border border-amber-200/50">
              <p className="text-xs text-gray-500">IP: 192.168.1.103</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAlertsView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg shadow-gray-100/50 border border-gray-100/50">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Gestion des alertes</h2>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-lg shadow-red-500/30 text-sm font-medium">
                Critiques (1)
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg shadow-amber-500/30 text-sm font-medium">
                Avertissements (1)
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg shadow-blue-500/30 text-sm font-medium">
                Informations (1)
              </button>
            </div>
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {recentAlerts.map((alert) => (
            <div key={alert.id} className="p-6 hover:bg-gray-50/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(alert.severity)}`}>
                      {alert.severity === 'error' ? 'Critique' : alert.severity === 'warning' ? 'Avertissement' : 'Information'}
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{alert.time}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg">{alert.building}</h3>
                  <p className="text-sm text-gray-600 mb-1">{alert.zone} • {alert.type}</p>
                  <p className="text-gray-800">{alert.message}</p>
                </div>
                <div className="flex space-x-2 ml-6">
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                    Acquitter
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-600/30 text-sm font-medium">
                    Détails
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSystemView = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg shadow-gray-100/50 border border-gray-100/50 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Node-RED</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200/50">
              <span className="text-sm text-gray-600">Statut</span>
              <span className="text-sm font-semibold text-emerald-700 flex items-center">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                Opérationnel
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-200/50">
              <span className="text-sm text-gray-600">Version</span>
              <span className="text-sm font-semibold text-gray-900">3.0.2</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-200/50">
              <span className="text-sm text-gray-600">Temps de fonctionnement</span>
              <span className="text-sm font-semibold text-gray-900">15j 8h 32m</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl border border-blue-200/50">
              <span className="text-sm text-gray-600">Flux actifs</span>
              <span className="text-sm font-semibold text-blue-700">23</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-xl border border-purple-200/50">
              <span className="text-sm text-gray-600">Messages/min</span>
              <span className="text-sm font-semibold text-purple-700">1,247</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg shadow-gray-100/50 border border-gray-100/50 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Base de données</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200/50">
              <span className="text-sm text-gray-600">Connexion</span>
              <span className="text-sm font-semibold text-emerald-700 flex items-center">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                Active
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-200/50">
              <span className="text-sm text-gray-600">Taille DB</span>
              <span className="text-sm font-semibold text-gray-900">2.3 GB</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl border border-blue-200/50">
              <span className="text-sm text-gray-600">Points de données</span>
              <span className="text-sm font-semibold text-blue-700">1,247,892</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-200/50">
              <span className="text-sm text-gray-600">Dernière sauvegarde</span>
              <span className="text-sm font-semibold text-gray-900">Il y a 2h</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg shadow-gray-100/50 border border-gray-100/50 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Passerelles Elastel</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Modèle</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Adresse IP</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Bâtiment</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Dernière comm.</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">EG410-001</td>
                <td className="px-6 py-4 text-sm text-gray-500 font-mono">192.168.1.101</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 border border-emerald-200">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></div>
                    En ligne
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">École du Centre</td>
                <td className="px-6 py-4 text-sm text-gray-500">Il y a 30s</td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Détails</button>
                </td>
              </tr>
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">EG500-002</td>
                <td className="px-6 py-4 text-sm text-gray-500 font-mono">192.168.1.102</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 border border-emerald-200">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></div>
                    En ligne
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">Piscine Municipale</td>
                <td className="px-6 py-4 text-sm text-gray-500">Il y a 45s</td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Détails</button>
                </td>
              </tr>
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">EG324-003</td>
                <td className="px-6 py-4 text-sm text-gray-500 font-mono">192.168.1.103</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 border border-amber-200">
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2"></div>
                    Maintenance
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">Gymnase Municipal</td>
                <td className="px-6 py-4 text-sm text-gray-500">Il y a 2h</td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Détails</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard': return renderDashboardView();
      case 'buildings': return renderBuildingsView();
      case 'monitoring': return renderMonitoringView();
      case 'alerts': return renderAlertsView();
      case 'system': return renderSystemView();
      case 'energy': return (
        <div className="bg-white rounded-2xl shadow-lg shadow-gray-100/50 border border-gray-100/50 p-8">
          <div className="text-center">
            <Zap className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Gestion énergétique</h2>
            <p className="text-gray-600">Analyse détaillée de la consommation par bâtiment et optimisation énergétique.</p>
          </div>
        </div>
      );
      case 'maintenance': return (
        <div className="bg-white rounded-2xl shadow-lg shadow-gray-100/50 border border-gray-100/50 p-8">
          <div className="text-center">
            <Wrench className="h-16 w-16 text-orange-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Planning de maintenance</h2>
            <p className="text-gray-600">Planification et suivi des interventions préventives et curatives.</p>
          </div>
        </div>
      );
      case 'analytics': return (
        <div className="bg-white rounded-2xl shadow-lg shadow-gray-100/50 border border-gray-100/50 p-8">
          <div className="text-center">
            <BarChart3 className="h-16 w-16 text-purple-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Analyses et tendances</h2>
            <p className="text-gray-600">Tableaux de bord analytiques et rapports de performance.</p>
          </div>
        </div>
      );
      case 'planning': return (
        <div className="bg-white rounded-2xl shadow-lg shadow-gray-100/50 border border-gray-100/50 p-8">
          <div className="text-center">
            <Calendar className="h-16 w-16 text-pink-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Planification</h2>
            <p className="text-gray-600">Programmation horaire et gestion des événements municipaux.</p>
          </div>
        </div>
      );
      case 'reports': return (
        <div className="bg-white rounded-2xl shadow-lg shadow-gray-100/50 border border-gray-100/50 p-8">
          <div className="text-center">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Rapports</h2>
            <p className="text-gray-600">Génération automatique de rapports et export des données.</p>
          </div>
        </div>
      );
      case 'settings': return (
        <div className="bg-white rounded-2xl shadow-lg shadow-gray-100/50 border border-gray-100/50 p-8">
          <div className="text-center">
            <Settings className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Paramètres système</h2>
            <p className="text-gray-600">Configuration des seuils, alertes et préférences utilisateur.</p>
          </div>
        </div>
      );
      default: return renderDashboardView();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50 flex relative overflow-hidden">
      {/* Habillage de fond élégant */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Formes géométriques colorées */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-400/15 to-pink-400/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-amber-400/15 to-orange-400/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '6s'}}></div>
        
        {/* Motifs géométriques */}
        <div className="absolute top-10 right-10 w-32 h-32 border border-blue-200/30 rounded-full animate-spin" style={{animationDuration: '20s'}}></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 border-2 border-purple-200/30 rotate-45 animate-bounce" style={{animationDuration: '3s'}}></div>
        <div className="absolute top-1/4 left-10 w-16 h-16 bg-gradient-to-br from-cyan-300/20 to-blue-300/20 rotate-12 rounded-lg animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-20 h-20 bg-gradient-to-br from-pink-300/20 to-purple-300/20 rounded-full animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
        
        {/* Lignes de grille subtiles */}
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(148, 163, 184, 0.03) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(148, 163, 184, 0.03) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
        
        {/* Particules flottantes */}
        <div className="absolute top-1/4 left-1/5 w-2 h-2 bg-blue-400/40 rounded-full animate-ping" style={{animationDuration: '3s'}}></div>
        <div className="absolute top-3/4 left-3/4 w-1.5 h-1.5 bg-purple-400/40 rounded-full animate-ping" style={{animationDelay: '2s', animationDuration: '4s'}}></div>
        <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-emerald-400/40 rounded-full animate-ping" style={{animationDelay: '1s', animationDuration: '2s'}}></div>
        <div className="absolute bottom-1/4 right-1/5 w-2 h-2 bg-amber-400/40 rounded-full animate-ping" style={{animationDelay: '3s', animationDuration: '5s'}}></div>
      </div>
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-72' : 'w-20'} bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 shadow-2xl border-r border-slate-700/50 transition-all duration-300 flex-shrink-0 fixed left-0 top-0 h-screen z-30`}>
        <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
          {sidebarOpen && (
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl shadow-lg shadow-blue-500/30">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div className="ml-3">
                <span className="text-lg font-bold text-white">GTB Elastel</span>
                <p className="text-xs text-slate-300">Gestion Technique Municipale</p>
              </div>
            </div>
          )}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-xl hover:bg-slate-700/50 transition-colors"
          >
            {sidebarOpen ? <X className="h-5 w-5 text-slate-300" /> : <Menu className="h-5 w-5 text-slate-300" />}
          </button>
        </div>
        
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? `bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 text-white shadow-lg shadow-${item.color}-500/40` 
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                }`}
              >
                <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-white' : `text-${item.color}-400 group-hover:text-${item.color}-300`}`} />
                {sidebarOpen && (
                  <span className={`ml-3 font-medium transition-colors ${isActive ? 'text-white' : 'group-hover:text-white'}`}>
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Contenu principal */}
      <div className={`flex-1 overflow-hidden relative z-10 ${sidebarOpen ? 'ml-72' : 'ml-20'} transition-all duration-300`}>
        {/* Overlay glassmorphism */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-slate-50/30 to-blue-50/20 backdrop-blur-[0.5px]"></div>
        {/* En-tête */}
        <header className="bg-gradient-to-r from-white/70 via-slate-50/80 to-blue-50/70 backdrop-blur-md shadow-xl border-b border-white/20 sticky top-0 z-20 relative">
          {/* Effet lumineux en arrière-plan */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5"></div>
          <div className="relative px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  {sidebarItems.find(item => item.id === activeView)?.label || 'Tableau de bord'}
                </h1>
                <p className="text-sm text-slate-600 mt-1">
                  Mise à jour en temps réel • {new Date().toLocaleTimeString('fr-FR')}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <select 
                  value={timeRange} 
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="border-0 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 text-sm font-medium text-slate-700 shadow-lg shadow-slate-200/50 focus:ring-2 focus:ring-blue-500 transition-all"
                >
                  <option value="1h">1 heure</option>
                  <option value="24h">24 heures</option>
                  <option value="7d">7 jours</option>
                  <option value="30d">30 jours</option>
                </select>
                <div className="flex items-center space-x-2 px-3 py-2 bg-emerald-50/80 backdrop-blur-sm rounded-xl border border-emerald-200/50">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-emerald-700">Système opérationnel</span>
                </div>
                <button className="p-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-200/80 transition-all border border-slate-200/50">
                  <Download className="h-5 w-5 text-slate-600" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Contenu */}
        <main className="p-8 overflow-y-auto h-full relative z-10">
          {/* Texture subtile d'overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent pointer-events-none"></div>
          <div className="relative z-10">
            {renderActiveView()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default GTBDashboard;