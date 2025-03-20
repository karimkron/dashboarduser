import { useState } from 'react';
import { useAuthStore } from '../../store/auth.store';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const { forgotPassword } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await forgotPassword(email);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
      <h2 className="text-2xl font-bold mb-6 text-center">Recuperar Contraseña</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors"
      >
        Enviar Código
      </button>
    </form>
  );
};

export default ForgotPasswordForm;