import '@root/global.scss';

import * as Constants from '@common/constants';
import * as Utilities from '@common/utilities';

import Accordion from '@components/Accordion';
import ActionBar from '@components/ActionBar';
import ActionButton from '@components/ActionButton';
import ActionListItem from '@components/ActionListItem-updated';
import AlertBanner from '@components/AlertBanner';
import Avatar from '@components/Avatar';
import Badge from '@components/Badge';
import BarLoader from '@components/BarLoader';
import BarProgress from '@components/BarProgress';
import Block from '@components/Block';
import BlockLoader from '@components/BlockLoader';
import Breadcrumbs from '@components/BreadCrumbs';
import Button from '@components/Button';
import ButtonGroup from '@components/ButtonGroup';
import CanvasPlatformer from '@components/CanvasPlatformer';
import CanvasSnake from '@components/CanvasSnake';
import Card from '@components/Card';
import CardDouble from '@components/CardDouble';
import Checkbox from '@components/Checkbox';
import ContentFluid from '@components/ContentFluid';
import DataTable from '@components/DataTable';
import DatePicker from '@components/DatePicker';
import DebugGrid from '@components/DebugGrid';
import DefaultActionBar from '@components/page/DefaultActionBar';
import DefaultLayout from '@components/page/DefaultLayout';
import Divider from '@components/Divider';
import Drawer from '@components/Drawer';
import DropdownMenuTrigger from '@components/DropdownMenuTrigger';
import Grid from '@components/Grid';
import Indent from '@components/Indent';
import Input from '@components/Input';
import IntDevLogo from '@components/svg/IntDevLogo';
import ListItem from '@components/ListItem';
import MatrixLoader from '@components/MatrixLoader';
import Message from '@components/Message';
import MessageViewer from '@components/MessageViewer';
import ModalAlert from '@components/modals/ModalAlert';
import ModalCreateAccount from '@components/modals/ModalCreateAccount';
import ModalError from '@components/modals/ModalError';
import ModalStack from '@components/ModalStack';
import ModalTrigger from '@components/ModalTrigger';
import NumberRangeSlider from '@components/NumberRangeSlider';
import Package from '@root/package.json';
import PopoverTrigger from '@components/PopoverTrigger';
import RadioButtonGroup from '@components/RadioButtonGroup';
import Row from '@components/Row';
import RowSpaceBetween from '@components/RowSpaceBetween';
import Script from 'next/script';
import Text from '@components/Text';
import TextArea from '@components/TextArea';
import TooltipTrigger from '@components/TooltipTrigger';
import TreeView from '@components/TreeView';
import UpdatingDataTable from '@components/examples/UpdatingDataTable';

export const dynamic = 'force-static';

const SAMPLE_TABLE_DATA_CHANGE_ME = [
    ['NAME', 'SYMBOL', 'PRICE', 'HOLDINGS'],
    ['Bat', 'BAT', '$9.01', '400'],
    ['Bear', 'BR', '$56.78', '200'],
    ['Camel', 'CML', '$55.67', '70'],
    ['Cheetah', 'CHT', '$13.45', '150'],
    ['Crab', 'CRB', '$15.67', '250'],
    ['Deer', 'DER', '$29.99', '110'],
    ['Dolphin', 'DLP', '$77.89', '50'],
    ['Eagle', 'EGL', '$45.67', '90'],
    ['Falcon', 'FLC', '$40.22', '85'],
    ['Fox', 'FOX', '$12.34', '100'],
    ['Frog', 'FRG', '$7.89', '400'],
    ['Giraffe', 'GRF', '$44.56', '80'],
    ['Hedgehog', 'HDG', '$11.23', '200'],
    ['Horse', 'HRS', '$54.32', '70'],
    ['Kangaroo', 'KNG', '$15.67', '120'],
    ['Koala', 'KLA', '$22.34', '150'],
    ['Leopard', 'LPR', '$14.56', '110'],
    ['Lemur', 'LMR', '$11.12', '320'],
    ['Lion', 'LION', '$67.89', '80'],
    ['Lynx', 'LNX', '$16.78', '130'],
    ['Mouse', 'MSE', '$5.12', '500'],
    ['Octopus', 'OCT', '$88.90', '40'],
    ['Otter', 'OTR', '$20.21', '180'],
    ['Owl', 'OWL', '$19.01', '160'],
    ['Panda', 'PND', '$78.90', '55'],
    ['Peacock', 'PCK', '$12.34', '100'],
    ['Penguin', 'PNG', '$33.45', '90'],
    ['Porcupine', 'PRC', '$17.89', '140'],
    ['Rabbit', 'RBT', '$9.10', '350'],
    ['Raccoon', 'RCC', '$18.90', '150'],
    ['Shark', 'SHK', '$89.01', '50'],
    ['Snake', 'SNK', '$10.11', '300'],
    ['Squirrel', 'SQL', '$10.12', '250'],
    ['Tiger', 'TGR', '$34.56', '120'],
    ['Turtle', 'TRL', '$66.78', '60'],
    ['Whale', 'WHL', '$123.45', '30'],
    ['Wolf', 'WLF', '$23.45', '150'],
    ['Zebra', 'ZBR', '$65.43', '60'],
  ];


  <Grid>
        <Accordion defaultValue={true} title="ACTION BAR">
          The action bar is a container for primary and secondary actions styled with a monospace font. Positioned at the top or bottom of an interface, it organizes elements like menu options, navigation buttons, titles, or search fields.
          <br />
          <br />
          <Card title="EXAMPLE">
            <ActionBar
              items={[
                {
                  hotkey: '⌘+1',
                  body: 'Example I',
                },
                {
                  hotkey: '⌘+2',
                  body: 'Example II',
                },
                {
                  hotkey: '⌘+3',
                  body: 'Example III',
                },
              ]}
            />
          </Card>
        </Accordion>

        <Accordion defaultValue={true} title="ACCORDION">
          Accordion components are vertically stacked, expandable panels designed for efficient use of space in monospace-driven layouts, often inspired by classic terminal interfaces. Each panel consists of a header and its corresponding content area, allowing users to toggle between a condensed summary and detailed information.
          <br />
          <br />
          <Card title="EXAMPLE">
            <Accordion defaultValue={true} title="ACCORDION EXAMPLE">
              There are two visions of America a half century from now. One is of a society more divided between the haves and the have-nots, a country in which the rich live in gated communities, send their children to expensive schools, and have access to first-rate medical care. Meanwhile, the rest live in a world marked by insecurity, at best mediocre education, and in effect rationed health care―they hope and pray they don't get seriously sick. At the bottom are millions of young people alienated and without hope. I have seen that picture in many developing countries; economists have given it a name, a dual economy, two societies living side by side, but hardly knowing each other, hardly imagining what life is like for the other. Whether we will fall to the depths of some countries, where the gates grow higher and the societies split farther and farther apart, I do not know. It is, however, the nightmare towards which we are slowly marching.
            </Accordion>
          </Card>
        </Accordion>

        <Accordion defaultValue={true} title="ACTION BUTTONS">
          Action buttons let users perform actions. They are used for task-based options within a workflow and work well in interfaces where buttons need to stay understated.
          <br />
          <br />
          <Card title="EXAMPLE">
            <ActionButton hotkey="⌘+S">Save</ActionButton>
            <br />
            <ActionButton hotkey={<BlockLoader mode={9} />}>Loading</ActionButton>
          </Card>
        </Accordion>

        <Accordion defaultValue={true} title="ACTION LIST">
          Action lists are a vertical list of interactive actions or options. It displays items in a single-column format with space for icons, descriptions, side information, and other visuals. The monospace font ensures clarity and consistency.
          <br />
          <br />
          <Card title="EXAMPLE">
            <ActionListItem icon={`⭡`}>Hide item example</ActionListItem>
            <ActionListItem icon={`⭢`}>Next item example</ActionListItem>
            <ActionListItem icon={`⭣`}>Show item example</ActionListItem>
            <ActionListItem icon={`⭠`} href="/">
              Return item example
            </ActionListItem>
            <ActionListItem icon={`⊹`}>Action item example</ActionListItem>
            <ActionListItem icon={`⊹`} href="https://internet.dev" target="_blank">
              Visit the studio website
            </ActionListItem>
          </Card>
        </Accordion>

        <Accordion defaultValue={true} title="ALERT BANNER">
          Alert banners display important messages across the user interface. It communicates system-wide issues, errors, warnings, or informational updates. Typically placed at the top of a page, it includes a clear message and may provide an action for the user. Alert Banners can be dismissed after being read, helping users stay informed about significant changes or information.
          <br />
          <br />
          <Card title="EXAMPLE">
            <AlertBanner>When things reach the extreme, they alternate to the opposite.</AlertBanner>
          </Card>
        </Accordion>

        <Accordion defaultValue={true} title="AVATARS">
          Avatars identify users or entities in the interface. It can display an image, initials, or an icon, offering a visual connection to the user. Avatars appear in headers, comments, profiles, and messages. They provide quick recognition and add a personal touch to the digital experience.
          <br />
          <br />
          <Card title="EXAMPLE">
            <Avatar src="https://pbs.twimg.com/profile_images/1818030201051430918/M6kSNje3_400x400.jpg" href="https://internet.dev" target="_blank" />
            <Avatar src="https://pbs.twimg.com/profile_images/1768438338841890816/taF_Uvqu_400x400.jpg" href="https://internet.dev" target="_blank" />
            <Avatar src="https://pbs.twimg.com/profile_images/1748647089633169408/B7vd7ito_400x400.jpg" href="https://internet.dev" target="_blank" />
            <Avatar src="https://pbs.twimg.com/profile_images/1778697935544627200/1LvOcE-F_400x400.jpg" href="https://internet.dev" target="_blank" />
            <Avatar src="https://pbs.twimg.com/profile_images/1841883108305731585/3rhRm7aY_400x400.jpg" href="https://internet.dev" target="_blank" />
            <Avatar src="https://avatars.githubusercontent.com/u/10610892?v=4" href="https://internet.dev" target="_blank" />
            <br />
            <br />
            <Avatar src="https://pbs.twimg.com/profile_images/1818030201051430918/M6kSNje3_400x400.jpg" href="https://internet.dev" target="_blank">
              <Indent>
                ANDREW ALIMBUYUGUEN
                <br />
                Webmaster
              </Indent>
            </Avatar>
            <Avatar src="https://pbs.twimg.com/profile_images/1768438338841890816/taF_Uvqu_400x400.jpg" href="https://internet.dev" target="_blank">
              <Indent>
                JIMMY LEE
                <br />
                Janitor
              </Indent>
            </Avatar>
            <Avatar src="https://pbs.twimg.com/profile_images/1748647089633169408/B7vd7ito_400x400.jpg" href="https://internet.dev" target="_blank">
              <Indent>
                ANASTASIYA URALEVA
                <br />
                Webmaster
              </Indent>
            </Avatar>
            <Avatar src="https://pbs.twimg.com/profile_images/1778697935544627200/1LvOcE-F_400x400.jpg" href="https://internet.dev" target="_blank">
              <Indent>
                ELIJAH SEED ARITA
                <br />
                Webmaster
              </Indent>
            </Avatar>
            <Avatar src="https://pbs.twimg.com/profile_images/1841883108305731585/3rhRm7aY_400x400.jpg" href="https://internet.dev" target="_blank">
              <Indent>
                XIANGAN HE
                <br />
                Webmaster
              </Indent>
            </Avatar>
            <Avatar src="https://avatars.githubusercontent.com/u/10610892?v=4" href="https://internet.dev" target="_blank">
              <Indent>
                CHENYU HUANG
                <br />
                Webmaster
              </Indent>
            </Avatar>
          </Card>
        </Accordion>

        <Accordion defaultValue={true} title="BADGES">
          Badges communicate status, notification counts, or attribute labels. Typically circular or pill-shaped, they display a number or short text, often overlaid on an icon or element. Badges highlight updates, unread messages, or categorize items with status indicators. They provide critical information at a glance, improving navigation and user engagement.
          <br />
          <br />
          <Card title="EXAMPLE">
            <Badge>Example</Badge>
          </Card>
        </Accordion>

        <Accordion defaultValue={true} title="BAR LOADER">
          A long loader is a visual element that signals ongoing activity or progress, reassuring users that a task is being processed. Commonly used during actions like data fetching or file uploads, it provides feedback to reduce uncertainty.
          <br />
          <br />
          <Card title="EXAMPLE">
            <BarLoader intervalRate={1000} />
            <BarLoader intervalRate={100} />
            <BarLoader progress={50} />
            <BarLoader progress={100} />
          </Card>
        </Accordion>

        <Accordion defaultValue={true} title="BLOCK LOADER">
          A block loader is a visual indicator that signals ongoing activity or progress while occupying only a single character of space. It reassures users that a task is being processed or that activity is occurring.
          <br />
          <br />
          <Card title="EXAMPLE">
            <BlockLoader mode={0} />
            <br />
            <BlockLoader mode={1} />
            <br />
            <BlockLoader mode={2} />
            <br />
            <BlockLoader mode={3} />
            <br />
            <BlockLoader mode={4} />
            <br />
            <BlockLoader mode={5} />
            <br />
            <BlockLoader mode={6} />
            <br />
            <BlockLoader mode={7} />
            <br />
            <BlockLoader mode={8} />
            <br />
            <BlockLoader mode={9} />
            <br />
            <BlockLoader mode={10} />
            <br />
            <BlockLoader mode={11} />
          </Card>
        </Accordion>

        <Accordion defaultValue={true} title="BREADCRUMBS">
          Breadcrumbs display the current page or context within a website or application. They show the hierarchy and navigation path, helping users understand their location. Breadcrumbs allow users to navigate back through levels or categories and are especially useful for deeply nested pages.
          <br />
          <br />
          <Card title="EXAMPLE">
            <Breadcrumbs
              items={[
                {
                  name: `Philosophical Taoism`,
                  url: 'https://en.wikipedia.org/wiki/Taoist_philosophy',
                },
                {
                  name: `Ursula K. Le Guin`,
                  url: 'https://en.wikipedia.org/wiki/Ursula_K._Le_Guin',
                },
                {
                  name: `The Lathe of Heaven`,
                  url: 'https://en.wikipedia.org/wiki/The_Lathe_of_Heaven',
                },
              ]}
            />
            <br />
            <br />
            <Breadcrumbs
              items={[
                {
                  name: `161 AD`,
                  url: 'https://en.wikipedia.org/wiki/161',
                },
                {
                  name: `Nerva–Antonine dynasty`,
                  url: 'https://en.wikipedia.org/wiki/Nerva–Antonine_dynasty',
                },
                {
                  name: `Marcus Aurelius Antoninus`,
                  url: 'https://en.wikipedia.org/wiki/Marcus_Aurelius',
                },
                {
                  name: `The Meditations`,
                  url: 'https://classics.mit.edu/Antoninus/meditations.html',
                },
              ]}
            />
            <br />
            <br />
            <Breadcrumbs
              items={[
                {
                  name: `Orthos Logos`,
                  url: 'https://orthoslogos.fr/',
                },
                {
                  name: `Littérature`,
                  url: 'https://orthoslogos.fr/litterature',
                },
                {
                  name: `Discours`,
                  url: 'https://orthoslogos.fr/litterature/discours/',
                },
                {
                  name: `Patrick Geddes`,
                  url: 'https://en.wikipedia.org/wiki/Patrick_Geddes',
                },
              ]}
            />
          </Card>
        </Accordion>

        <Accordion defaultValue={true} title="BUTTONS">
          Button components are essential interactive elements within SCL, facilitating actions like navigation, form submission, and command execution.
          <br />
          <br />
          <Card title="EXAMPLE">
            <Button>Primary Button</Button>
            <br />
            <Button theme="SECONDARY">Secondary Button</Button>
            <br />
            <Button isDisabled>Disabled Button</Button>
          </Card>
        </Accordion>

        <Accordion defaultValue={true} title="BUTTON GROUP">
          Button groups organize related actions within a shared container, offering quick access to frequently used tasks. These buttons are visually connected to emphasize their relationship and can also indicate a selected state.
          <br />
          <br />
          <Card title="EXAMPLE">
            <ButtonGroup items={[{ body: '16 PX', selected: true }, { body: '32 PX' }, { body: '42 PX' }]} />
            <ButtonGroup isFull items={[{ body: '16 PX', selected: true }, { body: '32 PX' }, { body: '42 PX' }]} />
          </Card>
        </Accordion>

        <Accordion defaultValue={true} title="CANVAS PLATFORMER">
          This canvas component provides a basic starting point for building a 2D platform game directly on a canvas element. It currently supports simple character jumping and rudimentary collision detection, making it easy to set up a foundational scene.
          <br />
          <br />
          <Card title="EXAMPLE">
            <CanvasPlatformer rows={12} />
          </Card>
        </Accordion>

        <Accordion defaultValue={true} title="CANVAS SNAKE">
          This canvas component provides a simple demo of the classic Snake game. It includes basic mechanics like movement and growth, while also demonstrating how to freeze the game state when the canvas loses focus, ensuring a smooth user experience.
          <br />
          <br />
          <Card title="EXAMPLE">
            <CanvasSnake rows={12} />
          </Card>
        </Accordion>

        <Accordion defaultValue={true} title="CARDS">
          Cards are MS-DOS–inspired sections designed to group related content and actions. They can serve as standalone features or function as part of a larger application. Each card clearly outlines key information, making it easier for users to identify and interact with important details.
          <br />
          <br />
          <Card title="Left-A" mode="left">
            <Card title="Right-B" mode="right">
              <Card title="C">To seek the timeless way we must first know the quality without a name. There is a central quality which is the root criterion of life and spirit in a man, a town, a building, or a wilderness. This quality is objective and precise, but it cannot be named.</Card>
            </Card>
          </Card>
          <CardDouble title="Left-A" mode="left">
            <CardDouble title="Right-B" mode="right">
              <CardDouble title="C">The structure of life I have described in buildings - the structure which I believe to be objective - is deeply and inextricably connected with the human person, and with the innermost nature of human feeling.</CardDouble>
            </CardDouble>
          </CardDouble>
          <Card title="Left-A" mode="left">
            <CardDouble title="Right-B" mode="right">
              <Card title="C">We are searching for some kind of harmony between two intangibles: a form which we have not yet designed and a context which we cannot properly describe.</Card>
            </CardDouble>
          </Card>
        </Accordion>

        <Accordion defaultValue={true} title="CHECKBOX">
          Checkboxes represent a binary choice, letting users toggle options on or off. Each Checkbox operates independently, allowing multiple selections without affecting others. Checkboxes are ideal for forms, surveys, or scenarios requiring multi-selection, providing a simple way for user input.
          <br />
          <br />
          <Card title="EXAMPLE">
            <Checkbox name="1">The past, though a tutor, is not a thing to lament, but a wellspring of wisdom from which we draw without regret.</Checkbox>
            <Checkbox name="2">A measure of obsession doth sharpen the will, for the long path, though beset with trials, leadeth ever toward glories.</Checkbox>
            <Checkbox name="3">Kindness and gratitude must light our way in all dealings, regardless of circumstance.</Checkbox>
            <Checkbox name="4">Stand firm beside thy fellow for shared triumph is the sweetest of all.</Checkbox>
            <Checkbox name="5">Let us strive that design be not a mere ornament to the world, but a worthy service to humanity itself.</Checkbox>
            <Checkbox name="6">Artifacts built with care do grant webmasters the power to shape their own fates, and to serve those thou dost cherish is an honor beyond measure.</Checkbox>
            <Checkbox name="7">Intensity, as fire contained, burneth most brightly when turned toward aims; thus, let us spurn the call of mediocrity and cast aside the seductions of decay.</Checkbox>
            <Checkbox name="8">Mistakes are not curses, but treasures wrapped in adversity, offered to those wise enough to seize their lessons.</Checkbox>
            <Checkbox name="9">Expect naught, but receive all with gratitude, and find a place of trust wherein thou mayest dwell for a time.</Checkbox>
            <Checkbox name="10">From thy master learn what thou canst, and from all others likewise, for wisdom hath many guises.</Checkbox>
            <Checkbox name="11">To follow with discipline is good; to follow oneself with discipline is better.</Checkbox>
            <Checkbox name="12">Work with fervor and take joy where it may be found, for the making is as sweet as the outcome.</Checkbox>
            <Checkbox name="13">Be mindful that there are ever more ways than two, and seek not merely to follow the trade but to alter its course, bringing value wherever it is given thee to do so.</Checkbox>
            <Checkbox name="14">Whether rewarded or not, let us ply our craft for the love of it, for therein lies mastery.</Checkbox>
            <Checkbox name="15">Assume nothing, and let no person escape thy regard.</Checkbox>
            <Checkbox name="16">A fine process doth honor the task, but let the result be no less fine.</Checkbox>
            <Checkbox name="17">Keep faith with those who make promises, and shouldst thou be called to push others, push thyself the harder.</Checkbox>
            <Checkbox name="18">Thy health is thy treasure, and building a company shall be no graceful dance, but a contest of strife.</Checkbox>
            <Checkbox name="19">Take always the first step, for even in failure doth wisdom grow.</Checkbox>
            <Checkbox name="20">Seek ever to broaden thy knowledge of art, software, music, letters, and all things ancient and new, for these are the treasures of the mind.</Checkbox>
            <Checkbox name="21">Thy fate lieth ever in thine own hands, and the soul readeth not only the landscape, but the heart that beats beneath it.</Checkbox>
            <Checkbox name="22">Let thy voice be thine own, unborrowed and unbowed, and make it heard without fear.</Checkbox>
            <Checkbox name="23">Rejoice in the victories of thy fellow webmasters, for in bearing witness to their triumphs is joy in its truest form.</Checkbox>
            <Checkbox name="24">Grow accustomed to the weight of pressure, for in such a forge is the finest steel tempered.</Checkbox>
            <Checkbox name="25">Thus do we press onward—undaunted and unyielding—in pursuit of a better physical and digital world.</Checkbox>
          </Card>
        </Accordion>

        <Accordion defaultValue={false} title="CHIP">
          Chips are compact, interactive elements that represent inputs, attributes, or actions. They are used for tasks like entering information, making selections, filtering content, or triggering actions. Chips help users scan and manage information efficiently.
          <br />
          <br />
          <Card title="EXAMPLE">WORK IN PROGRESS</Card>
        </Accordion>

        <Accordion defaultValue={false} title="CODE SNIPPET">
          Code snippets display code examples clearly and concisely, making them easy to read, copy, and use. It is essential for technical documentation, user guides, or design handbooks, supporting code sharing and review.
          <br />
          <br />
          <Card title="EXAMPLE">WORK IN PROGRESS</Card>
        </Accordion>

        <Accordion defaultValue={false} title="COMBOBOX">
          Comboboxes combine a dropdown list with an editable textbox, allowing users to select from a list or input data manually. It offers flexibility and autocomplete features, improving usability in scenarios where users may not know all options. Combobox is useful in forms, filtering lists, or any context requiring selection or custom input.
          <br />
          <br />
          <Card title="EXAMPLE">WORK IN PROGRESS</Card>
        </Accordion>

        <Accordion defaultValue={true} title="DATA TABLE">
          Data tables are for organizing large datasets into rows and columns for clear visibility and easy interpretation. It is used in scenarios like reporting systems, dashboards, and list views where data needs comparison, analysis, or manipulation. Features like sorting, filtering, pagination, and inline editing make data handling more efficient. The entire table width is limited to 64ch to fit the grid precisely.
          <br />
          <br />
          <Card title="STATIC">
            <DataTable data={SAMPLE_TABLE_DATA_CHANGE_ME} />
          </Card>
          <Card title="UPDATING">
            <UpdatingDataTable data={SAMPLE_TABLE_DATA_CHANGE_ME} />
          </Card>
        </Accordion>

        <Accordion defaultValue={true} title="DATE PICKER">
          A date picker is a UI control for selecting dates, and sometimes time, through a visual calendar interface inspired by MS-DOS. It ensures accurate date input and avoids formatting errors. Commonly used in forms, scheduling, or date-related tasks.
          <br />
          <br />
          <Card title="EXAMPLE">
            <DatePicker year={2012} month={12} />
            <br />
            <br />
            <DatePicker year={2024} month={12} />
          </Card>
        </Accordion>

        <Accordion defaultValue={false} title="DIALOG">
          Dialogs are modal window that overlays the main content, used for tasks requiring input or confirmation without leaving the current context. Commonly used for alerts, confirmations, or data entry, Dialog captures user attention and provides options to accept, reject, or dismiss the information.
          <br />
          <br />
          <Card title="EXAMPLE">WORK IN PROGRESS</Card>
        </Accordion>

        <Accordion defaultValue={true} title="DIVIDER">
          A divider separates sections of content, creating clear distinctions between related groups. It is typically a line or space, oriented horizontally or vertically based on the layout. Divider helps organize information, improve readability, and enhance the interface’s clarity and structure.
          <br />
          <br />
          <CardDouble title="ENTROPY">
            Any sense of order or stability inevitably crumbles. The entire universe follows a dismal trek toward a dull state of ultimate turmoil.
            <br />
            <br />
            <Divider />
            <br />
            To keep track of this cosmic decay, physicists employ a concept called entropy. Entropy is a measure of disorderliness, and the declaration that entropy is always on the rise — known as the second law of thermodynamics — is among nature’s most inescapable commandments.
            <br />
            <br />
            <Divider type="DOUBLE" />
            <br />
            I have long felt haunted by the universal tendency toward messiness. Order is fragile. It takes months of careful planning and artistry to craft a vase but an instant to demolish it with a soccer ball. We spend our lives struggling to make sense of a chaotic and unpredictable world, where any attempt to establish control seems only to backfire.
            <br />
            <br />
            <Divider type="GRADIENT" />
            <br />
            The second law demands that machines can never be perfectly efficient, which implies that whenever structure arises in the universe, it ultimately serves only to dissipate energy further — be it a star that eventually explodes or a living organism converting food into heat. We are, despite our best intentions, agents of entropy.
            <br />
            <br />
            <Divider type="GRADIENT" />
            <br />
            “Nothing in life is certain except death, taxes and the second law of thermodynamics,” wrote Seth Lloyd, a physicist at the Massachusetts Institute of Technology. There’s no sidestepping this directive. The growth of entropy is deeply entwined with our most basic experiences, accounting for why time runs forward and why the world appears deterministic rather than quantum mechanically uncertain.
            <br />
            <br />
            <Divider type="GRADIENT" />
            <br />— Zack Savitzky
          </CardDouble>
        </Accordion>

        <Accordion defaultValue={true} title="DRAWER">
          A drawer is a panel that slides in from the screen edge, providing space for secondary content, actions, or navigation links while keeping the main content uninterrupted.
          <br />
          <br />
          <CardDouble title="INTRO(1)">
            <RowSpaceBetween>
              <Drawer>
                <ActionListItem icon={`⊹`}>User Commands</ActionListItem>
                <ActionListItem icon={`⊹`}>System Calls</ActionListItem>
                <ActionListItem icon={`⊹`}>C Library Functions</ActionListItem>
                <ActionListItem icon={`⊹`}>Devices and Special Files</ActionListItem>
                <ActionListItem icon={`⊹`}>File Formats and Conventions</ActionListItem>
                <ActionListItem icon={`⊹`}>Games et. Al.</ActionListItem>
                <ActionListItem icon={`⊹`}>Miscellanea</ActionListItem>
                <ActionListItem icon={`⊹`}>System Administration</ActionListItem>
                <ActionListItem icon={`⊹`}>Tools</ActionListItem>
                <ActionListItem icon={`⊹`}>Daemons</ActionListItem>
              </Drawer>
              <ContentFluid>
                INTRODUCTION
                <br />
                <br />
                Section 1 of the manual describes user commands and tools, for example, file manipulation tools, shells, compilers, web browsers, file and image viewers and editors, and so on. All commands yield a status value on termination. This value can be tested (e.g., in most shells the variable $? contains the status of the last executed command) to see whether the command completed successfully. A zero exit status is conventionally used to indicate success, and a nonzero status means that the command was unsuccessful. (Details of the exit status can be found in wait(2).) A nonzero exit status can be in the range 1 to 255, and some commands use different nonzero status values to indicate the reason why the command failed.
              </ContentFluid>
            </RowSpaceBetween>
          </CardDouble>
        </Accordion>

        <Accordion defaultValue={true} title="DROPDOWN MENU">
          A dropdown menu is an interactive element that lets users select an option from a collapsible menu, saving space by hiding options until needed.
          <br />
          <br />
          <Card title="EXAMPLE">
            <RowSpaceBetween>
              <DropdownMenuTrigger
                items={[
                  { icon: '⊹', children: 'F1 - Help' },
                  { icon: '⊹', children: 'F2 - Custom Help' },
                  { icon: '⊹', children: 'F3 - Directory' },
                  { icon: '⊹', children: 'F4 - Locate File' },
                  { icon: '⊹', children: 'F5 - Change Drive' },
                  { icon: '⊹', children: 'F6 - Change Directory' },
                  { icon: '⊹', children: `F7 - DOS Command` },
                  { icon: '⊹', children: 'F8 - Set Time/Date' },
                  { icon: '⊹', children: 'F9 - Disk Space' },
                  { icon: '⊹', children: 'F10 - Copy Files' },
                ]}
              >
                <ActionButton>TOP LEFT</ActionButton>
              </DropdownMenuTrigger>
              <DropdownMenuTrigger
                items={[
                  { icon: '⭡', children: 'Restore from Time Machine' },
                  { icon: '⭢', children: 'Reinstall macOS Ventura' },
                  { icon: '⭣', children: 'Safari' },
                  { icon: '⭠', children: 'Disk Utility' },
                  { icon: '⊹', children: 'Visit Search System', href: 'https://searchsystem.co/', target: '_blank' },
                ]}
              >
                <ActionButton>TOP RIGHT</ActionButton>
              </DropdownMenuTrigger>
            </RowSpaceBetween>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <RowSpaceBetween>
              <DropdownMenuTrigger
                items={[
                  { icon: '⊹', children: 'Safe mode' },
                  { icon: '⊹', children: 'Safe mode with Networking' },
                  { icon: '⊹', children: 'Safe Mode with Command Prompt' },
                  { icon: '⊹', children: 'Enable Boot Logging' },
                  { icon: '⊹', children: 'Enable low-resolution video (640x480)' },
                  { icon: '⊹', children: 'Last Known Good Configuration (advanced)' },
                  { icon: '⊹', children: `Direcotry Services Restore Node` },
                  { icon: '⊹', children: 'Debugging Mode' },
                  { icon: '⊹', children: 'Disable automatic restart on system failure' },
                  { icon: '⊹', children: 'Disable Driver Signature Enforcement' },
                ]}
              >
                <ActionButton>BOTTOM LEFT</ActionButton>
              </DropdownMenuTrigger>
              <DropdownMenuTrigger
                items={[
                  { icon: '⊹', children: 'Create New Menu' },
                  { icon: '⊹', children: 'Edit a Menu' },
                  { icon: '⊹', children: 'Remove A Menu' },
                  { icon: '⊹', children: 'DOS Password' },
                  { icon: '⊹', children: 'Screen Saver' },
                  { icon: '⊹', children: 'Company Name' },
                  { icon: '⊹', children: `Set Swap Drive` },
                  { icon: '⊹', children: 'Select Colors' },
                  { icon: '⊹', children: 'Sound On/Off' },
                  { icon: '⊹', children: 'Save all Menus' },
                  { icon: '⊹', children: 'Leave Setup' },
                ]}
              >
                <ActionButton>BOTTOM RIGHT</ActionButton>
              </DropdownMenuTrigger>
            </RowSpaceBetween>
          </Card>
        </Accordion>

        <Accordion defaultValue={false} title="EMPTY STATE">
          An empty state informs users when no content is available, such as for first-time users, empty searches, or errors. Instead of showing a blank screen, it provides guidance, feedback, or calls to action to engage users. Empty State turns confusing moments into opportunities for onboarding, education, or improved satisfaction.
          <br />
          <br />
          <Card title="EXAMPLE">WORK IN PROGRESS</Card>
        </Accordion>

        <Accordion defaultValue={true} title="INPUT">
          An input field is a fundamental UI component that allows users to enter and edit text or numerical data. It is commonly used in forms, search bars, and other interfaces requiring user input.
          <br />
          <br />
          <Card title="EXAMPLE">
            <Input label="MULTIPLE INPUTS" autoComplete="off" isBlink={false} name="input_test_empty" />
            <Input autoComplete="off" isBlink={false} name="input_test_empty" />
            <Input autoComplete="off" isBlink={false} name="input_test_empty" />
            <Input autoComplete="off" isBlink={false} label="EMPTY CASE" name="input_test_one" />
            <Input autoComplete="off" isBlink={false} placeholder="All the world is a stage" label="PLACEHOLDER" name="input_test_two" />
            <Input autoComplete="off" isBlink={false} label="PASSWORD" type="password" name="input_test_password" />
            <Input autoComplete="off" isBlink={true} label="CARET BLINK" name="input_test_blink" />
            <Input autoComplete="off" caretChars="(✿﹏●)" isBlink={true} label="CUSTOM CARET TEXT" name="input_test_caret" />
            <Input autoComplete="off" caretChars="⌫ ERROR" isBlink={false} label="CUSTOM CARET TEXT" name="input_test_single_caret" />
            <Input autoComplete="off" caretChars={<BlockLoader mode={6} />} isBlink={false} label="CUSTOM CARET LOADER" name="input_test_single_caret" />
          </Card>
        </Accordion>

        <Accordion defaultValue={true} title="FORM">
          A form is a key interface element for collecting user inputs.
          <br />
          <br />
          <CardDouble title="NEW ACCOUNT">
            Create a new MakeBelieve™ account, where anything is possible at your command line in the browser.
            <br />
            <br />
            <RadioButtonGroup
              defaultValue="test_individual"
              options={[
                { value: 'test_individual', label: 'I’m using this for personal use.' },
                { value: 'test_developer', label: 'I’m building or creating something for work.' },
                { value: 'test_company', label: 'We’re using this as a team or organization.' },
              ]}
            />
            <br />
            <Input autoComplete="off" label="USERNAME" placeholder="Choose a username (e.g., Goonboy05)" name="test_username" />
            <Input autoComplete="off" label="PASSWORD" placeholder="Create a password (8+ characters)" type="password" name="test_password" />
            <Input autoComplete="off" label="CONFIRM" placeholder="Type it again" type="password" name="test_confirm" />
            <br />
            <Checkbox name="test_terms">I agree to the Terms of Service, Data Privacy Policy, and Acceptable Use Guidelines.</Checkbox>
            <Checkbox name="test_goodwill">I agree not to use this service for unlawful purposes.</Checkbox>
            <br />
            <Button>Create an account</Button>
          </CardDouble>
        </Accordion>

        <Accordion defaultValue={false} title="HELP TEXT">
          Help text is a brief description that provides instructions, additional information, or context to assist users. It is often placed with form fields, complex elements, or new features where clarification is needed.
          <br />
          <br />
          <Card title="EXAMPLE">WORK IN PROGRESS</Card>
        </Accordion>

        <Accordion defaultValue={false} title="INLINE MESSAGE">
          An inline message is a small alert that provides contextual feedback or information during user interactions. It appears near specific elements, like form fields, to give immediate guidance or feedback.
          <br />
          <br />
          <Card title="EXAMPLE">WORK IN PROGRESS</Card>
        </Accordion>

        <Accordion defaultValue={false} title="LABEL">
          Labels are text elements that identifies input fields or interface objects, providing clear descriptions to guide users in entering appropriate data. Often paired with form controls like checkboxes or radio buttons, Labels enhance accessibility and may include supplementary instructions.
          <br />
          <br />
          <Card title="EXAMPLE">WORK IN PROGRESS</Card>
        </Accordion>

        <Accordion defaultValue={true} title="LINK">
          Links are interactive elements that enable navigation within an application or to external resources, typically styled with underlining or distinct colors to indicate clickability.
          <br />
          <br />
          <Card title="EXAMPLE">
            <ol>
              <ListItem>
                <a href="https://www.tumblr.com/tagged/hiroo%20isono" target="_blank">
                  Hirō Isono
                </a>
              </ListItem>
              <ListItem>
                <a href="https://www.tumblr.com/tagged/rebecca%20guay" target="_blank">
                  Rebecca Guay
                </a>
              </ListItem>
              <ListItem>
                <a href="https://www.tumblr.com/tagged/terese%20nielsen" target="_blank">
                  Terese Nielsen
                </a>
              </ListItem>
              <ListItem>
                <a href="https://www.tumblr.com/tagged/pablo%20uchida" target="_blank">
                  Pablo Uchida
                </a>
              </ListItem>
              <ListItem>
                <a href="https://www.tumblr.com/tagged/claude%20monet" target="_blank">
                  Oscar-Claude Monet
                </a>
              </ListItem>
              <ol>
                <ListItem>
                  <a href="https://en.wikipedia.org/wiki/Impressionism" target="_blank">
                    Impressionism
                  </a>
                </ListItem>
                <ListItem>
                  <a href="https://en.wikipedia.org/wiki/Modernism" target="_blank">
                    Modernism
                  </a>
                </ListItem>
                <ListItem>
                  <a href="https://en.wikipedia.org/wiki/En_plein_air" target="_blank">
                    Painting Outdoors
                  </a>
                </ListItem>
              </ol>
            </ol>
          </Card>
        </Accordion>

        <Accordion defaultValue={true} title="LIST">
          Lists are flexible interface elements used to display a series of items in an organized way. They are often used to present data, menu options, or search results and can be ordered or unordered, with interactive elements like checkboxes or buttons.
          <br />
          <br />
          <Card title="EXAMPLE">
            <ol>
              <ListItem>Year of the Four Emperors</ListItem>
              <ListItem>Flavian dynasty</ListItem>
              <ListItem>Nerva–Antonine dynasty</ListItem>
              <ol>
                <ListItem>Marcus Cocceius Nerva</ListItem>
                <ListItem>Marcus Ulpius Traianus</ListItem>
                <ListItem>Publius Aelius Hadrianus</ListItem>
                <ListItem>Titus Aelius Hadrianus Antoninus Pius</ListItem>
                <ListItem>Marcus Aurelius Antoninus</ListItem>
                <ol>
                  <ListItem>Hellenistic philosophy</ListItem>
                  <ListItem>Western philosophy</ListItem>
                  <ListItem>Stoicism</ListItem>
                </ol>
              </ol>
              <ListItem>Year of the Five Emperors</ListItem>
            </ol>
            <br />
            <ul>
              <ListItem>Book of Changes (The I Ching)</ListItem>
              <ListItem>The Analects</ListItem>
              <ListItem>Taoism</ListItem>
              <ListItem>Thirty-Six Stratagems</ListItem>
              <ul>
                <ListItem>Deceive the heavens to cross the sea</ListItem>
                <ListItem>Make a sound in the east, then strike in the west</ListItem>
                <ListItem>Create something from nothing</ListItem>
              </ul>
              <ListItem>The Art of War</ListItem>
              <ListItem>Wuzi</ListItem>
              <ListItem>Six Secret Teachings</ListItem>
            </ul>
          </Card>
        </Accordion>

        <Accordion defaultValue={false} title="MENUS">
          Menus are dynamic UI elements that combine action lists and overlay patterns to provide a roster of items representing commands, actions, or selections, supporting single or multi-select capabilities. They offer a space-efficient way to present choices, enabling users to execute actions, adjust settings, or make selections within a transient container.
          <br />
          <br />
          <Card title="EXAMPLE">WORK IN PROGRESS</Card>
        </Accordion>

        <Accordion defaultValue={true} title="MESSAGES">
          Messages in this library present a modern messaging experience through an MS-DOS–inspired aesthetic. Instead of rounded speech bubbles, messages appear in simple rectangular boxes, evoking a nostalgic, classic PC feel.
          <br />
          <br />
          <Card title="EXAMPLE">
            <Message>You create the world of the dream, you bring the subject into that dream, and they fill it with their subconscious.</Message>
            <MessageViewer>How could I ever acquire enough detail to make them think that its reality?</MessageViewer>
            <Message>Well dreams, they feel real while we're in them, right? It's only when we wake up that we realize how things are actually strange.</Message>
            <Message>Let me ask you a question, you, you never really remember the beginning of a dream do you? You always wind up right in the middle of what's going on.</Message>
            <MessageViewer>I guess, yeah.</MessageViewer>
            <Message>So how did we end up here?</Message>
          </Card>
        </Accordion>

        <Accordion defaultValue={true} title="MATRIX LOADER">
          A Matrix Loader (screen) is a visual element that simulates the iconic green, cascading code streams featured in the Matrix films. These screens often serve as dynamic backdrops, thematic treatments, or stylized representations of complex digital data. This version fits starsof's theming and monospace font usage.
          <br />
          <br />
          <Card title="KATAKANA DEFAULT">
            <MatrixLoader rows={32} mode="katakana" />
          </Card>
          <Card title="GREEK LTR">
            <MatrixLoader direction="left-to-right" rows={8} mode="greek" />
          </Card>
        </Accordion>

        <Accordion defaultValue={true} title="MODAL">
          Modals are dialog boxes or popups that overlay the main content, requiring user interaction. They are used to capture inputs, display information, or focus on specific tasks without leaving the current context, often accompanied by an overlay to maintain focus
          <br />
          <br />
          <Card title="EXAMPLE">
            <ModalTrigger
              modal={ModalAlert}
              modalProps={{
                message: 'During the 1960s, Ritchie and Ken Thompson worked on the Multics operating system at Bell Labs. Thompson then found an old PDP-7 machine and developed his own application programs and operating system from scratch, aided by Ritchie and others. In 1970, Brian Kernighan suggested the name "Unix", a pun on the name "Multics". To supplement assembly language with a system-level programming language, Thompson created B. Later, B was replaced by C, created by Ritchie, who continued to contribute to the development of Unix and C for many years.',
                buttonText: 'Sweet, thanks.',
              }}
            >
              <ActionButton>Render Alert Modal A</ActionButton>
            </ModalTrigger>
            <ModalTrigger modal={ModalAlert} modalProps={{ message: `Dennis Ritchie and Ken Thompson's creation of the UNIX operating system and the C programming language were pivotal developments in the progress of computer science. Today, 50 years after its beginnings, UNIX and UNIX-like systems continue to run machinery from supercomputers to smartphones.` }}>
              <ActionButton>Render Alert Modal B</ActionButton>
            </ModalTrigger>

            <ModalTrigger modal={ModalAlert} modalProps={{ message: `In short, no pattern is an isolated entity. Each pattern can exist in the world only to the extent that is supported by other patterns: the larger patterns in which it is embedded, the patterns of the same size that surround it, and the smaller patterns which are embedded in it.` }}>
              <ActionButton>Render Alert Modal C</ActionButton>
            </ModalTrigger>

            <ModalTrigger modal={ModalCreateAccount}>
              <ActionButton>Render Create Account Modal</ActionButton>
            </ModalTrigger>

            <ModalTrigger modal={ModalError} modalProps={{ message: <>Non-fatal error detected: error FOOLISH (Please contact STARSOF support.)</>, title: `SETUP` }}>
              <ActionButton>Error A</ActionButton>
            </ModalTrigger>

            <ModalTrigger
              modal={ModalError}
              modalProps={{
                message: (
                  <>
                    Boot Manager has experienced a problem.
                    <br />
                    <br />
                    Status: 0xc000000f
                    <br />
                    <br />
                    Info: An error occured transferring excecution.
                    <br />
                    <br />
                    You can try to recover the system with the Recovery Tools.
                    <br />
                    <br />
                    If the problem continues, please contact your system administrator or computer manufacturer.
                  </>
                ),
                title: `BOOT DRIVER`,
              }}
            >
              <ActionButton>Error B</ActionButton>
            </ModalTrigger>

            <ModalTrigger
              modal={ModalError}
              modalProps={{
                message: (
                  <>
                    Although you can't use CTRL+ALT+DEL to quit an application that has stopped responding in this context, there is no reason to in this state.
                    <br />
                    <br />
                    To quit this website, follow the options below or kill your browser, or choose to give up and go do something else.
                  </>
                ),
                title: `STARS`,
              }}
            >
              <ActionButton>Error C</ActionButton>
            </ModalTrigger>
          </Card>
        </Accordion>

        <Accordion defaultValue={false} title="NAVIGATION BAR">
          Navigation bars enable smooth transitions between top-level destinations in an app, using icons and text labels to represent sections.
          <br />
          <br />
          <Card title="EXAMPLE">WORK IN PROGRESS</Card>
        </Accordion>

        <Accordion defaultValue={false} title="PAGE HEADER">
          Page headers are key interface elements typically placed at the top of a page to provide context and indicate the current location within an application or website.
          <br />
          <br />
          <Card title="EXAMPLE">WORK IN PROGRESS</Card>
        </Accordion>

        <Accordion defaultValue={false} title="PAGINATION">
          Pagination is an interface control that enables navigation through large datasets spread across multiple pages. Commonly found at the bottom of tables or lists, it allows users to move to the next, previous, first, last, or specific pages.
          <br />
          <br />
          <Card title="EXAMPLE">WORK IN PROGRESS</Card>
        </Accordion>

        <Accordion defaultValue={true} title="POPOVER">
          Popovers are transient views that appear above content when users interact with an associated element, offering relevant information, details, or interactive content like actions or form elements.
          <br />
          <br />
          <Card title="EXAMPLE">
            <RowSpaceBetween>
              <PopoverTrigger text="An old silent pond">
                <ActionButton>TOP LEFT</ActionButton>
              </PopoverTrigger>
              <PopoverTrigger text="A world of dew">
                <ActionButton>TOP RIGHT</ActionButton>
              </PopoverTrigger>
            </RowSpaceBetween>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <RowSpaceBetween>
              <PopoverTrigger text="The light of a candle">
                <ActionButton>BOTTOM LEFT</ActionButton>
              </PopoverTrigger>
              <PopoverTrigger text="I write, erase, rewrite">
                <ActionButton>BOTTOM RIGHT</ActionButton>
              </PopoverTrigger>
            </RowSpaceBetween>
          </Card>
        </Accordion>

        <Accordion defaultValue={true} title="PROGRESS BARS">
          Progress bars are visual indicators that display the completion status of tasks or processes. Ours allow for custom fill characters.
          <br />
          <br />
          <Card title="EXAMPLE">
            <Card mode="left" title="0%">
              <BarProgress progress={0} />
            </Card>

            <Card mode="left" title="25%">
              <BarProgress progress={25} />
            </Card>

            <Card mode="left" title="50%">
              <BarProgress progress={50} />
            </Card>

            <Card mode="left" title="75%">
              <BarProgress progress={75} fillChar={`(✿﹏●)`} />
            </Card>

            <Card mode="left" title="75%">
              <BarProgress progress={75} />
            </Card>

            <Card mode="left" title="100%">
              <BarProgress progress={100} />
            </Card>
          </Card>
        </Accordion>

        <Accordion defaultValue={true} title="RADIO BUTTONS">
          Radio buttons are visual controls that let users make a single selection from a predefined set of mutually exclusive options. Represented as small circles that fill when selected, they are used when all options need to be visible and only one can be chosen.
          <br />
          <br />
          <CardDouble title="METHOD">
            You’re at the very beginning of deg your operating system. How do you choose to start?
            <br />
            <br />
            <RadioButtonGroup
              defaultValue="one"
              options={[
                { value: 'one', label: 'Custom Linux Kernel Derivative: Start with a minimal Linux kernel (e.g., a stripped-down mainline LTS release), integrate essential device drivers, and build out a tailored init process.' },
                { value: 'two', label: 'AOSP Base: Leverage an AOSP-derived HAL and system services, using BSP integration and existing frameworks as a foundation for rapid device bring-up.' },
                { value: 'three', label: 'Microkernel Approach: Implement a microkernel (e.g., seL4) to strictly separate core services, relying on IPC mechanisms and user-space servers to manage drivers, file systems, and device I/O.' },
              ]}
            />
          </CardDouble>
          <CardDouble title="INTERFACE">
            How will you implement your interface layer?
            <br />
            <br />
            <RadioButtonGroup
              defaultValue="four"
              options={[
                { value: 'four', label: 'Native GUI Shell + EGL/Wayland: Use a lean, native toolkit with hardware-accelerated rendering (EGL), compositing via Wayland, and minimal shell protocols.' },
                { value: 'five', label: 'Adapted Android Framework: Employ the Android UI stack (SurfaceFlinger, View hierarchy), integrating Material Components as baseline UI elements, and build custom system apps via Jetpack.' },
                { value: 'six', label: 'Custom-Compositor + Custom Widgets: Implement a dedicated compositor (e.g., custom Weston derivative) and write your own widget toolkit in C++/Rust, managing input events and layouts directly.' },
              ]}
            />
          </CardDouble>
          <CardDouble title="SECURITY">
            How will you handle security and lifecycle management?
            <br />
            <br />
            <RadioButtonGroup
              defaultValue="seven"
              options={[
                { value: 'seven', label: 'Signed Kernel/OS Updates + Verified Boot: Use a secure bootloader chain (e.g., U-Boot with verified boot), sign OTA payloads, and apply delta updates with rollback support.' },
                { value: 'eight', label: 'TEE Integration + SELinux Policies: Embed a Trusted Execution Environment (e.g., ARM TrustZone), enforce SELinux policies system-wide, and apply monthly patch-level updates from upstream code sources.' },
                { value: 'nine', label: 'Containerized Services + Granular Permissions: Run system services and third-party apps in containerized sandboxes (LXC, cgroups, seccomp), enforce capability-based permissions, and manage rolling updates at a container or microservice level.' },
              ]}
            />
          </CardDouble>
        </Accordion>

        <Accordion defaultValue={false} title="SELECT">
          Select components are user interface controls that let users choose an option from a dropdown list. They display a list of options and collapse to show the selected choice, making them ideal for scenarios with limited space and multiple options.
          <br />
          <br />
          <Card title="EXAMPLE">WORK IN PROGRESS</Card>
        </Accordion>

        <Accordion defaultValue={false} title="SIDEBAR">
          Sidebars are navigational panels that provide seamless access to secondary actions, additional information, or sub-navigation menus related to the current page or section. They can be static or collapsible, adapting to design needs and screen sizes.
          <br />
          <br />
          <Card title="EXAMPLE">WORK IN PROGRESS</Card>
        </Accordion>

        <Accordion defaultValue={true} title="SLIDER">
          Sliders are interactive UI elements that let users select a single value or range from a continuum. Designed as a horizontal track with a draggable handle, they are ideal for adjusting settings like volume, brightness, or color saturation.
          <br />
          <br />
          <Card title="EXAMPLE">
            <NumberRangeSlider defaultValue={0} min={0} max={5000} step={1} />
            <NumberRangeSlider defaultValue={0} min={0} max={10000} step={1} />
            <NumberRangeSlider defaultValue={0} min={0} max={15000} step={1} />
            <NumberRangeSlider defaultValue={0} min={0} max={20000} step={1} />
            <NumberRangeSlider defaultValue={0} min={0} max={100000} step={1} />
          </Card>
        </Accordion>

        <Accordion defaultValue={false} title="SNACKBAR">
          Snackbars are brief messages that appear at the bottom of the screen to provide feedback on operations, such as task completion or new data arrival. They are transient, disappearing automatically after a few seconds, but may include a dismiss option or action button.
          <br />
          <br />
          <Card title="EXAMPLE">WORK IN PROGRESS</Card>
        </Accordion>

        <Accordion defaultValue={false} title="SWITCH">
          Switches are toggle controls that let users turn a single option on or off, commonly used for binary settings like enabling or disabling features. They provide immediate visual feedback, making them intuitive and efficient.
          <br />
          <br />
          <Card title="EXAMPLE">WORK IN PROGRESS</Card>
        </Accordion>

        <Accordion defaultValue={false} title="TABS">
          Tabs are interactive UI elements that allow users to switch between different views or subsections within the same context. Each tab corresponds to distinct content, with only one active at a time, typically positioned at the top of the content area.
          <br />
          <br />
          <Card title="EXAMPLE">WORK IN PROGRESS</Card>
        </Accordion>

        <Accordion defaultValue={false} title="TAG">
          Tags are interactive UI elements that represent information as keywords or attributes, commonly used for labeling, categorizing, or adding metadata to items. They often include text labels and may feature icons for removal, especially in input fields.
          <br />
          <br />
          <Card title="EXAMPLE">WORK IN PROGRESS</Card>
        </Accordion>

        <Accordion defaultValue={true} title="TEXT AREA">
          Text areas are UI elements that allow users to input multiple lines of text, ideal for content like comments, reviews, or descriptions. Our text areas feature arrow key support, and a visible caret to track the cursor position. There is also an auto play feature for rendering text on the screen in sequence that you can interupt at anytime.
          <br />
          <br />
          <Card title="EXAMPLE">
            <TextArea />
          </Card>
          <Card title="BLINK">
            <TextArea isBlink />
          </Card>
          <Card title="PLACEHOLDER">
            <TextArea placeholder="There he took up again his great Ring in Barad-dur." />
          </Card>
          <Card title="AUTO PLAY">
            <TextArea autoPlay="The doom of the Elves is to be immortal, to love the beauty of the world, to bring it to full flower with their gifts of delicacy and perfection, to last while it lasts, never leaving it even when ‘slain’, but returning – and yet, when the Followers come, to teach them, and make way for them, to ‘fade’ as the Followers grow and absorb the life from which both proceed. The Doom (or the Gift) of Men is mortality, freedom from the circles of the world." autoPlaySpeedMS={50} />
          </Card>
          <Card title="AUTO PLAY SLOW">
            <TextArea autoPlay="All of us who do creative work, we get into it because we have good taste. But there is this gap. For the first couple years you make stuff, it’s just not that good. It’s trying to be good, it has potential, but it’s not. But your taste, the thing that got you into the game, is still killer. And your taste is why your work disappoints you." autoPlaySpeedMS={100} isBlink />
          </Card>
        </Accordion>

        <Accordion defaultValue={true} title="TOOLTIP">
          Tooltips are text labels that provide additional context or explanations for user interface elements, appearing on hover, focus, or touch. They are used to communicate brief, supplementary information or clarify unlabeled controls.
          <br />
          <br />
          <Card title="EXAMPLE">
            <RowSpaceBetween>
              <TooltipTrigger text="The future depends on what we do in the present.">
                <ActionButton>TOP LEFT</ActionButton>
              </TooltipTrigger>
              <TooltipTrigger text="An eye for an eye only ends up making the whole world blind.">
                <ActionButton>TOP RIGHT</ActionButton>
              </TooltipTrigger>
            </RowSpaceBetween>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <RowSpaceBetween>
              <TooltipTrigger text="Live as if you were to die tomorrow">
                <ActionButton>BOTTOM LEFT</ActionButton>
              </TooltipTrigger>
              <TooltipTrigger text="The best way to find yourself is to lose yourself in the service of others.">
                <ActionButton>BOTTOM RIGHT</ActionButton>
              </TooltipTrigger>
            </RowSpaceBetween>
          </Card>
        </Accordion>

        <Accordion defaultValue={true} title="TREEVIEW">
          Tree Views are hierarchical list structures that allow users to navigate nested information or functionalities, commonly used for parent-child relationships like file directories or menus.
          <br />
          <br />
          <Card title="FILE SYSTEM">
            <TreeView defaultValue={true} isRoot title="Animal Kingdom">
              <TreeView defaultValue={true} title="Chordata">
                <TreeView defaultValue={true} title="Mammalia">
                  <TreeView defaultValue={true} title="Primates">
                    <TreeView title="Hominidae.csv" isFile />
                    <TreeView title="Cercopithecidae.csv" isFile />
                  </TreeView>
                  <TreeView defaultValue={true} title="Carnivora">
                    <TreeView title="Felidae.csv" isFile />
                    <TreeView title="Canidae.csv" isFile />
                  </TreeView>
                  <TreeView defaultValue={true} title="Cetacea">
                    <TreeView title="Delphinidae.csv" isFile />
                    <TreeView title="Balaenidae.csv" isFile />
                  </TreeView>
                </TreeView>
                <TreeView defaultValue={true} title="Mammalia Rejects"></TreeView>
                <TreeView defaultValue={true} title="Aves">
                  <TreeView defaultValue={true} title="Passeriformes">
                    <TreeView title="Corvidae.csv" isFile />
                    <TreeView title="Fringillidae.csv" isFile />
                  </TreeView>
                  <TreeView defaultValue={true} title="Accipitriformes">
                    <TreeView title="Accipitridae.csv" isFile />
                    <TreeView title="Pandionidae.csv" isFile />
                  </TreeView>
                </TreeView>
                <TreeView defaultValue={true} title="Reptilia">
                  <TreeView defaultValue={true} title="Squamata">
                    <TreeView title="Viperidae.csv" isFile />
                    <TreeView title="Iguanidae.csv" isFile />
                  </TreeView>
                  <TreeView defaultValue={true} title="Testudines">
                    <TreeView title="Cheloniidae.csv" isFile />
                    <TreeView title="Testudinidae.csv" isFile />
                  </TreeView>
                </TreeView>
              </TreeView>
              <TreeView defaultValue={true} title="Arthropoda">
                <TreeView defaultValue={true} title="Insecta">
                  <TreeView defaultValue={true} title="Coleoptera">
                    <TreeView title="Coccinellidae.csv" isFile />
                    <TreeView title="Scarabaeidae.csv" isFile />
                  </TreeView>
                  <TreeView defaultValue={true} title="Diptera">
                    <TreeView title="Culicidae.csv" isFile />
                    <TreeView title="Syrphidae.csv" isFile />
                  </TreeView>
                </TreeView>
                <TreeView defaultValue={true} title="Arachnida">
                  <TreeView defaultValue={true} title="Araneae">
                    <TreeView title="Salticidae.csv" isFile />
                    <TreeView title="Theraphosidae.csv" isFile />
                  </TreeView>
                  <TreeView defaultValue={true} title="Scorpiones">
                    <TreeView title="Buthidae.csv" isFile />
                    <TreeView title="Scorpionidae.csv" isFile />
                  </TreeView>
                </TreeView>
              </TreeView>
            </TreeView>
          </Card>
        </Accordion>
      </Grid>
  