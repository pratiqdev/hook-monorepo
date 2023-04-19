import { 
    MouseEvent as ReactMouseEvent, 
    TouchEvent as ReactTouchEvent 
} from 'react';

type ClickTouchEvent<Target = Element> = ReactMouseEvent<Target> | ReactTouchEvent<Target>;
