import { SortableHandle } from 'react-sortable-hoc';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

const DragHandle = SortableHandle(() => (
  <span>
    <DragIndicatorIcon />
  </span>
));

export default DragHandle;
