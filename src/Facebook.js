const Facebook = function() {
  const pixelIds = {};

  const _initBaseScipt = () => {
    /* eslint-disable */
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */
  };

  const _isInitialized = () => {
    if (Object.keys(pixelIds).length > 0) {
      throw new Error('Already initialized.');
    }
  };

  /**
   * @param {...args} First Argument - Must be a boolean
   * @param {...args} Other Arguments - Pixel ids that are already initialized
   */
  const setSchema = (...args) => {
    if (args.length < 2) {
      throw new Error('Function must contain at least 2 arguments');
    }

    let pidStr;

    args.forEach((arg, idx) => {
      if (idx === 0 && typeof arg !== 'boolean') {
        throw new Error('Second argument must be a boolean.');
      } else if (idx > 0) {
        pidStr = typeof pid === 'number' ? arg.toString() : arg;
        if (!pixelIds[pidStr]) {
          throw new Error(`Pixel ID ${arg} is not initialized.`);
        } else {
          window.fbq('set', 'autoConfig', arg, pidStr);
        }
      }
    });
    return true;
  };

  /**
   * @param {...pids} Pixel IDs - Comma separated list of pixel ids
   */
  const init = (...pids) => {
    _isInitialized();
    _initBaseScipt();

    const regex = /^\d+$/;

    pids.forEach(pid => {
      if (regex.test(pid)) {
        const pidStr = typeof pid === 'number' ? pid.toString() : pid;
        window.fbq('init', pidStr);
        pixelIds[pidStr] = true;
      } else {
        throw new Error('Pixel ID should only contain numbers.');
      }
    });

    return pixelIds;
  };

  const publicAPI = {
    init,
    setSchema,
  };

  return publicAPI;
};
