import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './Store';

// Типизированные хуки — используйте их вместо голых useDispatch/useSelector
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
