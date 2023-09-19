import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ToastProvider: React.FC = () => {
  return <ToastContainer closeOnClick autoClose={500} theme="light" />
}

export default ToastProvider
