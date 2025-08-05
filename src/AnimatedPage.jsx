
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './AnimatedPage.css';

const AnimatedPage = () => {
  const [isHovered, setIsHovered] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.5 } },
    exit: { opacity: 0, transition: { duration: 0.5 } }
  };

  const cardVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 10 } },
    hover: { scale: 1.05, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)" }
  };

  const buttonVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { delay: 0.5, duration: 0.8 } },
    tap: { scale: 0.9 }
  };

  return (
    <motion.div
      className="animated-page-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.h1
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 50, delay: 0.2 }}
      >
        화려한 애니메이션 페이지
      </motion.h1>

      <motion.div
        className="card-grid"
        initial="initial"
        animate="animate"
      >
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="animated-card"
            variants={cardVariants}
            whileHover="hover"
          >
            <h2>카드 {i}</h2>
            <p>이것은 애니메이션이 적용된 카드입니다.</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.button
        className="animated-button"
        variants={buttonVariants}
        initial="initial"
        animate="animate"
        whileTap="tap"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <motion.span
          animate={{ x: isHovered ? 10 : 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          클릭해보세요!
        </motion.span>
      </motion.button>
    </motion.div>
  );
};

export default AnimatedPage;
