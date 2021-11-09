import { getElementIndex } from '../_utils/helpers/dom-helpers/_getElementIndex';
import { ElementAnimateUtil } from '../_utils/ElementAnimateUtil';
import { EventHandlerUtil } from '../_utils/EventHandlerUtil';
import { getUniqueIdWithPrefix } from '../_utils/helpers/types-helpers/_getUniqueIdWithPrefix';
import { DataUtil } from '../_utils/_DataUtil';
import { DOMEventHandlerUtil } from '../_utils/_DOMEventHandlerUtil';
import { ElementStyleUtil } from '../_utils/_ElementStyleUtil';

const defaultStepperOptions = {
  startingStepIndex: 1,
  animation: true,
  animationSpeed: '.3s',
  animationNextClass: 'animate__animated animate__fadeInLeft',
  animationPreviousClass: 'animate__animated animate__fadeInRight', }

class StepperComponent {
  element = null

  options = defaultStepperOptions;

  instanceUid = '';

  steps = [];

  btnNext = null;

  btnPrev = null;

  btnSubmit = null;

  totalStepsNumber = 0;

  passedStepIndex = 0;

  currentStepIndex = 1;

  constructor(_element = null, options) {
    this.element = _element;
    this.options = Object.assign(defaultStepperOptions, options);
    this.instanceUid = getUniqueIdWithPrefix('stepper');

    // Elements
    this.steps = this.element.querySelectorAll(
      '[data-bb-stepper-element="nav"]'
    );
    this.btnNext = this.element.querySelector(
      '[data-bb-stepper-action="next"]'
    );
    this.btnPrev = this.element.querySelector(
      '[data-bb-stepper-action="previous"]'
    );
    this.btnSubmit = this.element.querySelector(
      '[data-bb-stepper-action="submit"]'
    );

    // Variables
    // eslint-disable-next-line no-bitwise
    this.totalStepsNumber = this.steps?.length | 0;
    this.passedStepIndex = 0;
    this.currentStepIndex = 1;

    // Set Current Step
    if (this.options.startingStepIndex > 1) {
      this._goTo(this.options.startingStepIndex);
    }

    // Event Handlers
    this.initHandlers();

    // Bind Instance
    DataUtil.set(this.element, 'stepper', this);
  }

  _goTo = (index = 0) => {
    EventHandlerUtil.trigger(this.element, 'bb.stepper.change');
    // Skip if this step is already shown
    if (index === this.currentStepIndex || index > this.totalStepsNumber || index < 0) {
      return;
    }

    // Validate step number
    // eslint-disable-next-line radix,no-param-reassign
    index = parseInt(index.toString());
    // Set current step
    this.passedStepIndex = this.currentStepIndex;
    this.currentStepIndex = index;

    // Refresh elements
    this.refreshUI();

    EventHandlerUtil.trigger(this.element, 'bb.stepper.changed');
  };

  initHandlers = () => {
    this.btnNext?.addEventListener('click', (e) => {
      e.preventDefault();

      EventHandlerUtil.trigger(this.element, 'bb.stepper.next', e);
    });

    this.btnPrev?.addEventListener('click', (e) => {
      e.preventDefault();

      EventHandlerUtil.trigger(this.element, 'bb.stepper.previous', e);
    });

    DOMEventHandlerUtil.on(
      this.element,
      '[data-bb-stepper-action="step"]',
      'click',
      (e) => {
        e.preventDefault();

        if (this.steps && this.steps.length > 0) {
          for (let i = 0; i < this.steps.length; i++) {
            if ((this.steps[i]) === this.element) {
              const index = i + 1;

              const stepDirection = this._getStepDirection(index);
              EventHandlerUtil.trigger(
                this.element,
                `stepper.${stepDirection}`,
                e
              );
              return;
            }
          }
        }
      }
    );
  };

  _getStepDirection = (index = 0) => (index > this.currentStepIndex ? 'next' : 'previous');

  getStepContent = (index = 0) => {
    const content = this.element.querySelectorAll(
      '[data-bb-stepper-element="content"]'
    );
    if (!content) {
      return false;
    }

    if (content[index - 1]) {
      return content[index - 1];
    }

    return false;
  };

  getLastStepIndex = () => this.totalStepsNumber;

  getTotalStepsNumber = () => this.totalStepsNumber;

  refreshUI = () => {
    let state = '';

    if (this.isLastStep()) {
      state = 'last';
    } else if (this.isFirstStep()) {
      state = 'first';
    } else {
      state = 'between';
    }

    // Set state class
    this.element.classList.remove('last');
    this.element.classList.remove('first');
    this.element.classList.remove('between');

    this.element.classList.add(state);

    // Step Items
    const elements = this.element.querySelectorAll(
      '[data-bb-stepper-element="nav"], [data-bb-stepper-element="content"], [data-bb-stepper-element="info"]'
    );

    if (!elements || elements.length <= 0) {
      return;
    }

    for (let i = 0, len = elements.length; i < len; i++) {
      const element = elements[i]
      const index = getElementIndex(element) + 1;

      element.classList.remove('current');
      element.classList.remove('completed');
      element.classList.remove('pending');

      if (index === this.currentStepIndex) {
        element.classList.add('current');

        if (
          this.options.animation !== false
          && element.getAttribute('data-bb-stepper-element') === 'content'
        ) {
          ElementStyleUtil.set(
            element,
            'animationDuration',
            this.options.animationSpeed
          );

          const animation = this._getStepDirection(this.passedStepIndex) === 'previous'
            ? this.options.animationPreviousClass
            : this.options.animationNextClass;
          ElementAnimateUtil.animateClass(element, animation);
        }
      } else if (index < this.currentStepIndex) {
        element.classList.add('completed');
      } else {
        element.classList.add('pending');
      }
    }
  };

  isLastStep = () => this.currentStepIndex === this.totalStepsNumber;

  isFirstStep = () => this.currentStepIndex === 1;

  isBetweenStep = () => this.isLastStep() === false && this.isFirstStep() === false;

  //   ///////////////////////
  //   // ** Public API  ** //
  //   ///////////////////////

  //   // Plugin API
  goto = (index) => this._goTo(index)

  goNext = () => this.goto(this.getNextStepIndex());

  goPrev = () => this.goto(this.getPrevStepIndex());

  goFirst = () => this.goto(1);

  goLast = () => this.goto(this.getLastStepIndex());

  getCurrentStepIndex = () => this.currentStepIndex;

  getNextStepIndex = () => {
    if (this.totalStepsNumber >= this.currentStepIndex + 1) {
      return this.currentStepIndex + 1;
    }
    return this.totalStepsNumber;
  };

  getPassedStepIndex = () => this.passedStepIndex;

  getPrevStepIndex = () => {
    if (this.currentStepIndex - 1 > 1) {
      return this.currentStepIndex - 1;
    }
    return 1;
  };

  getElement = () => this.element;

  // Event API
  on = (name = '', handler) => EventHandlerUtil.on(this.element, name, handler);

  one = (name = '', handler) => EventHandlerUtil.one(this.element, name, handler);

  off = (name = '') => EventHandlerUtil.off(this.element, name);

  destroy = () => {
  };

  trigger = (name = '', event) => EventHandlerUtil.trigger(this.element, name, event);

  // Static methods
  static hasInstance(element) {
    return DataUtil.has(element, 'stepper');
  }

  static getInstance(element) {
    if (element !== null && StepperComponent.hasInstance(element)) {
      return DataUtil.get(element, 'stepper');
    }
    return null;
  }

  // Create Instances
  static createInstances(selector) {
    const elements = document.body.querySelectorAll(selector);
    elements.forEach((element) => {
      const item = element
      let stepper = StepperComponent.getInstance(item);
      if (!stepper) {
        stepper = new StepperComponent(item, defaultStepperOptions);
      }
    });
  }

  static createInstance(element, options = defaultStepperOptions) {
    if (!element) {
      return null;
    }
    let stepper = StepperComponent.getInstance(element);
    if (!stepper) {
      stepper = new StepperComponent(element, options);
    }
    return stepper;
  }

  static bootstrap(attr = '[data-bb-stepper]') {
    StepperComponent.createInstances(attr);
  }
}

export { StepperComponent, defaultStepperOptions };
