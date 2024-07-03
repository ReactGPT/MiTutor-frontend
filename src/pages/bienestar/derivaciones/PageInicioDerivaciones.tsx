import React, { useEffect } from 'react';
import { useAuth } from '../../../context';
import { useDerivationBienestar } from '../../../store/hooks/useDerivationBienestar';

function DashboardCard({ title, count, color }: { title: string, count: number, color: string }) {
  const bgColor = count === 0 ? 'gray-200' : `${color}-300`;
  const borderColor = count === 0 ? 'gray-400' : `${color}-500`;

  return (
    <div className={`bg-${bgColor} border-${borderColor} border-2 rounded-xl font-roboto p-4 shadow-custom flex flex-col items-center`}>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-3xl font-bold">{count}</p>
    </div>
  );
} 

export default function PageInicioDerivaciones() {
  const { userData } = useAuth();
  const { derivaciones, loading, error, fetchDerivaciones } = useDerivationBienestar(userData?.userInfo?.id || 0);

  useEffect(() => {
    fetchDerivaciones();
  }, []);

  const pendientes = derivaciones.filter(d => d.status === 'Pendiente').length;
  const observadas = derivaciones.filter(d => d.status === 'Observado').length;
  const atendidas = derivaciones.filter(d => d.status === 'Atendido').length;
  const total = derivaciones.length;

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar los datos</div>;

  return (
    <div className="p-6">
      <div className="grid grid-cols-3 gap-6 mb-6">
        <DashboardCard title="Derivaciones Pendientes" count={pendientes} color="pink" />
        <DashboardCard title="Derivaciones Observadas" count={observadas} color="yellow" />
        <DashboardCard title="Derivaciones Atendidas" count={atendidas} color="green" />
      </div>
      <div className="flex justify-center">
        <DashboardCard title="Total de Derivaciones" count={total} color="blue" />
      </div>
    </div>
  );
}