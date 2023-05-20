import { FC } from "react";
import { 
  MdDirectionsBike as BikeIcon, 
  MdOutlineDirectionsRun as RunIcon,
  MdRowing as RowingIcon,
} from 'react-icons/md'
import { CiDumbbell as WeightsIcon } from 'react-icons/ci'
import { 
  FaShoePrints as WalkIcon, 
  FaSwimmer as SwimIcon,
  FaHeartbeat as WorkoutIcon,
} from 'react-icons/fa'
import { Box } from "../../utils";

interface Props {
  activityType: string
  size?: number
}

export const ActivityIcon:FC<Props> = ({activityType, size = 16}) => {

  const Icon = () => {
    switch(activityType) {
      case 'Ride':
      case 'VirtualRide':
        return <BikeIcon fontSize={size}/>
      case 'Run':
        return <RunIcon fontSize={size}/>
      case 'Rowing':
        return <RowingIcon fontSize={size}/>
      case 'WeightTraining':
        return <WeightsIcon fontSize={size}/>
      case 'Walk':
        return <WalkIcon fontSize={size}/>
      case 'Swim':
        return <SwimIcon fontSize={size}/>
      default:
        return <WorkoutIcon fontSize={size}/>
    }
  }

  return (
    <Box flex direction="column" justifyContent="flex-start" width='auto' mt='4px'>
      <Icon />
    </Box>
  )
}