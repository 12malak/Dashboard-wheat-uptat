import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Stack } from "@mui/material";
import Header from "../../components/Header";

const FAQ = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
<Box dir="rtl" lang="ar">
  
      <Header title="حول لوحه التحكم" subTitle="" />
  
      <Stack direction={"column"} gap={2}>
  
      
      
      
      
      
        <Accordion defaultExpanded onChange={handleChange("panel1")}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
             الاضافة
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
             طعام أو دواء أو ورشه
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
             ستتمكن من خلال لوحه التحكم هذه أضافه دواء او طعام او ورشه بكامل التفاصيل بكل سهوله .
            </Typography>
          </AccordionDetails>
        </Accordion>
  
        <Accordion
          // @ts-ignore
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>تقويم</Typography>
            <Typography sx={{ color: "text.secondary" }}>
          تسجيل الملاحظات
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            تحتوي على تقوم يمكنك من تسجيل الملاحظات او المواعيد و حفظها يوميا او اسبوعيا او شهريا .
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          // @ts-ignore
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
           القوائم
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
            قوائم بالمستخدمين و الطهاه و المشرفين
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
          تحتوي على جميع معلومات المستخدمين و الطهاه و المشرفين و يمكن للمشرف بحذف او تعديل الدور من مستخدم الى مشرف و العكس صحيح
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          // @ts-ignore
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
            الطلبات
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            ستمكنك هذه الصفحة من ارسال رساله للزبون و تخزين جميع الطلبات
            </Typography>
          </AccordionDetails>
        </Accordion>
  
        <Accordion
          // @ts-ignore
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
            مسجات التواصل
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
             التواصل عبر البريد الالكتروني
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            ستحتوي ع جميع المسجات الواصله من الزائرين للموقع او المستخدمين و
             ستمكنك هذه الصفحة من الرد على جميع الاستفسارات   بارسال رساله نصيه الى البريد الالكتروني الخاض فيه . 
             </Typography>
          </AccordionDetails>
        </Accordion>
  
        <Accordion
          // @ts-ignore
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>الوصفات </Typography>
            <Typography sx={{ color: "text.secondary" }}>
           الموافقه على الوصفه قبل عرضها في الموقع
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            ستمكنك هذه الصفحة من قبول او رفض للوصفات و عرض تفاصيل الوصفه 
            </Typography>
          </AccordionDetails>
        </Accordion>
       
      </Stack>
</Box>
  );
};

export default FAQ;
