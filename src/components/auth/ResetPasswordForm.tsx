import { useState } from 'react';
import { useAuthStore } from '../../store/auth.store';

const ResetPasswordForm = () => {
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { resetPassword } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await resetPassword(code, newPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
      <h2 className="text-2xl font-bold mb-6 text-center">Restablecer Contraseña</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Código</label>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700">Nueva Contraseña</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors"
      >
        Restablecer Contraseña
      </button>
    </form>
  );
};

export default ResetPasswordForm;