
import { useToast } from './ToastContext';
import Toast from './Toast';

const ToastContainer = () => {
  const { toasts } = useToast();

  return (
    <div className="fixed top-24 right-4 z-50 space-y-3 pointer-events-none">
      {toasts.map((toast, index) => (
        <Toast 
          key={toast.id} 
          toast={toast} 
          index={index}
        />
      ))}
    </div>
  );
};

export default ToastContainer;