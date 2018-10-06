const fantasticalIcon = require('./FantasticalIcon.png');

export const name = 'Add to Fantastical';
export const keyword = 'fantastical';
export const icon = fantasticalIcon;

export const fn = ({ term, display, actions }) => {
  const [command, ...args] = term.split(/\s+/);

  if (command === keyword) {
    const [subCommand, ...cmdArgs] = args;

    // "fantastical add"
    if (!subCommand || 'add'.startsWith(subCommand)) {
      if ('add' === subCommand) {
        let sentence = cmdArgs.join(' ');

        if (sentence) {
          const addImmediately = sentence.endsWith('!') ? 1 : 0;
          if (addImmediately) {
            sentence = sentence.slice(0, -1);
          }
          display({
            icon: fantasticalIcon,
            title: 'Add to Fantastical',
            subtitle: sentence,
            onSelect: () =>
              actions.open(
                `x-fantastical2://parse?s=${sentence}&add=${addImmediately}`
              )
          });
        } else {
          display({
            icon: fantasticalIcon,
            title: 'Insert text to add to Fantastical'
          });
        }
      } else {
        display({
          icon: fantasticalIcon,
          title: 'Add to Fantastical',
          term: `${keyword} add`
        });
      }
    }

    // "fantastical open"
    if (!subCommand || 'open'.startsWith(subCommand)) {
      display({
        icon: fantasticalIcon,
        title: 'Open Fantastical Mini',
        term: `${keyword} open`,
        onSelect: () => actions.open('x-fantastical2://show/mini')
      });
      display({
        icon: fantasticalIcon,
        title: 'Open Fantastical Full Calendar',
        term: `${keyword} open`,
        onSelect: () => actions.open('x-fantastical2://show/calendar')
      });
    }
  }
};
