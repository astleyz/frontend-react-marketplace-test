import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';

const TealCheckbox = withStyles({
  root: {
    'color': teal[400],
    '&$checked': {
      color: teal[600],
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />);

export default TealCheckbox;
