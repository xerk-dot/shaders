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
import { lazy, Suspense, useState } from 'react';
import { ModalProvider } from '@components/page/ModalContext';
import ResponsiveTextDisplay from '@components/ResponsiveTextDisplay';
import SubtitleHeader from '@components/SubtitleHeader';
import { data } from 'app/_info/info';
import { useMediaQuery } from './hooks/useMediaQuery';
import styles from './page.module.css';
import { SuperimposedHero } from '@components/superimposed-hero/superimposed-hero';
import CodeBlock from '@components/CodeBlock';
import SidebarLayout from '@components/SidebarLayout';
import { shaderData } from './data';
import ShaderCanvas from '@components/ShaderCanvas';
import Link from 'next/link';

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
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['none']);
  
  const categories = [
    { id: 'none', name: 'None' },
    { id: 'all', name: 'All' },
    { id: 'noise', name: 'Noise & Patterns' },
    { id: 'geometry', name: 'Geometry & Shapes' },
    { id: 'color', name: 'Color & Gradients' },
    { id: 'animation', name: 'Animation & Motion' },
  ];

  const handleCategoryChange = (categoryId: string) => {
    console.log('Category toggled:', categoryId);
    
    setSelectedCategories(prev => {
      // Handle "None" selection
      if (categoryId === 'none') {
        return ['none'];
      }
      
      // If any other category is selected, unselect "None"
      if (categoryId === 'all') {
        return ['all'];
      }
      
      if (prev.includes(categoryId)) {
        const newCategories = prev.filter(id => id !== categoryId);
        return newCategories.length === 0 ? ['none'] : newCategories;
      }
      
      const newCategories = prev.filter(id => id !== 'all' && id !== 'none');
      return [...newCategories, categoryId];
    });
  };

  const filteredShaders = selectedCategories.includes('none') 
    ? [] 
    : shaderData.filter(shader => 
        selectedCategories.includes('all') || selectedCategories.includes(shader.category)
      );
  
  return (
    <>
{/*       {(
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
      )} */}

{(
  <div className="shaderContainer" style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '80vh',
    zIndex: -1,
    opacity: 0.5
  }}>
    <ShaderCanvas 
      shaderId="compound-eye"
      width={1920}
      height={900}
      fadeBottom={true}
    />
  </div>
)}
      <Grid>
      <Hero word="(look at my)" />
      <SuperimposedHero />

       <Card title="search" mode="left" maxWidth="85vw" centered>
        <div className="relative z-10 flex flex-col gap-10 my-20 max-w-[1200px] px-5 md:px-10 w-full mx-auto">
          {/* Category Filter */}
          {categories.map(category => (
            <div key={category.id}>
              <Checkbox
                name={category.id}
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleCategoryChange(category.id)}
              >
                {category.name}
              </Checkbox>
            </div>
          ))}
          

          {/* Shaders Grid */}
          <div className="flex flex-col gap-10">
            {filteredShaders.map((shader) => (
              <div key={shader.id}>
                <Link href={`/${shader.id}`} style={{ background: 'none' }} className="!no-underline !text-inherit hover:!bg-none">
                      <div className="shaderContainer">
                        <ShaderCanvas 
                          shaderId={shader.id}
                          width={600}
                          height={400}
                        />
                      </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
       </Card>

      </Grid>
   
    </>
  );
}
