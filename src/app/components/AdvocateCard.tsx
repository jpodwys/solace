import { Advocate } from "@/types/types";
import { Card, CardContent, CardHeader, Chip, Stack } from "@mui/material";
import LocationPinIcon from '@mui/icons-material/LocationPin';
import SchoolIcon from '@mui/icons-material/School';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ScheduleIcon from '@mui/icons-material/Schedule';

interface AdvocateCardProps {
  advocate: Advocate;
};

const AdvocateCard = ({ advocate }: AdvocateCardProps) => {
  return (
    <Card sx={{ width: '300px', margin: '10px', backgroundColor: '' }}>
      <CardHeader
        slotProps={{
          root: { sx: { paddingBottom: '0' } },
          title: { fontSize: '20px', textAlign: 'center', marginBottom: '16px' },
          subheader: { marginBottom: '0' },
        }}
        title={`${advocate.firstName} ${advocate.lastName}`}
        subheader={
          <div>
            <div className="flex justify-between py-2">
              <span>
                <LocalPhoneIcon /> {advocate.phoneNumber.replace(/\D+/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}
              </span>
              <span>
                <SchoolIcon /> {advocate.degree}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span>
                <LocationPinIcon /> {advocate.city}
              </span>
              <span>
                <ScheduleIcon /> {advocate.yearsOfExperience} years
              </span>
            </div>
          </div>
        }
      />
      <CardContent>
        <p className="text-center pb-2">{advocate.specialties.length} Specialties</p>
        <Stack direction="row" spacing={1} overflow="auto">
          {advocate.specialties.map((s, specialtyIndex) => (
            <Chip color="primary" key={specialtyIndex} label={s} variant="filled" size="small" />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default AdvocateCard;
