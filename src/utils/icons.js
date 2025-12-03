// Tree-shakeable FontAwesome icon imports
// This replaces the 633KB fontawesome.css file with only the icons we actually use

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowUp,
    faBars,
    faCheck,
    faAngleDown,
} from '@fortawesome/free-solid-svg-icons';

import {
    faGithub,
} from '@fortawesome/free-brands-svg-icons';

// Export configured icons for easy use
export const Icons = {
    ArrowUp: faArrowUp,
    Bars: faBars,
    Check: faCheck,
    AngleDown: faAngleDown,
    Github: faGithub,
};

export { FontAwesomeIcon };
