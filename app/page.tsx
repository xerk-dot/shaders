'use client';

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
import Footer from '@components/Footer';
import Hero from '@components/Hero';
import Navigation from '@components/Navigation_updated';
import { lazy, Suspense } from 'react';
import { ModalProvider } from '@components/page/ModalContext';
import ResponsiveTextDisplay from '@components/ResponsiveTextDisplay';
import SubtitleHeader from '@components/SubtitleHeader';
import { data } from 'app/_info/info';
import { useMediaQuery } from './hooks/useMediaQuery';
import styles from './page.module.css';
import { SuperimposedHero } from '@components/superimposed-hero/superimposed-hero';
import CodeBlock from '@components/CodeBlock';
import SidebarLayout from '@components/SidebarLayout';

const Carousel = lazy(() =>
  import('@components/carousel/carousel').then(module => ({ default: module.Carousel }))
);



const carouselImages = [

  {
    src: "https://picsum.photos/seed/1/1920/900",
    alt: "Placeholder image 1", 
  },
  {
    src: "https://picsum.photos/seed/13/1920/900",
    alt: "Placeholder image 13",
  },
  {
    src: "https://picsum.photos/seed/8/1920/900",
    alt: "Placeholder image 8",
  },
  {
    src: "/vr-midjourney.png",
    alt: "Placeholder image 9",
  }
];



export default function Page(props) {
  const isDesktop = useMediaQuery('(min-width: 781px)');
  
  return (
    <>
      {(
        <div className={styles.mobileCarouselWrapper}>
          <Suspense fallback={null}>
            <Carousel
              placeholder="https://placehold.co/transparent/transparent/F00"
              images={carouselImages}
              width={1920}
              height={900}
              fadeBottom={true}
            />
          </Suspense>
        </div>
      )}

      <Hero word="look at my cool" />
      <SuperimposedHero />

       
   
    </>
  );
}
