import { useTranslation } from 'react-i18next';
import LabelIcon from '../../../../../../components/Ui/LabelIcon';
import { colors } from '../../../../../../Styles/ui';
import { quizColorMapping } from '../../../lib/quizColorMapping';

const QuizStatusLabel = ({ status }: { status: number }) => {
  const { t } = useTranslation();

  return <LabelIcon text={t(`monitor.status.${status}`)} color={quizColorMapping[status]} />;
};

export default QuizStatusLabel;
