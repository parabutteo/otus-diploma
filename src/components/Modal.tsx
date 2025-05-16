import React from "react";
import { createPortal } from "react-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  useMediaQuery,
  useTheme
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export interface IModal {
  /** Обработчик закрытия */
  onClose: () => void;
  /** Признак открытия */
  isOpen: boolean;
  /** Контент */
  children: React.ReactNode | string;
  /** Заголовок */
  title: string;
}

/**
 * Компонент модального окна (Material Android-style с блюром и прозрачностью, поддержка dark mode)
 *
 * Обрабочик закрытия распространяется как на кнопку закрытия, так и на клик вне модалки (т.е. по оверлею)
 *
 * В Компоненте присутствует паттерн "Children types"
 */
export const Modal: React.FC<IModal> = ({ onClose, isOpen, children, title }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return createPortal(
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      fullScreen={fullScreen}
      maxWidth="sm"
      scroll="body"
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 2,
          backdropFilter: "blur(8px)",
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(25, 25, 25, 0.8)"
              : "rgba(255, 255, 255, 0.85)",
        },
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
        <DialogTitle sx={{ p: 0 }}>{title}</DialogTitle>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>,
    document.body
  );
};
