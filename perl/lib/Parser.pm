package Parser;
use strict;
use warnings;
use Log;

sub new {
    my ($class, %args) = @_;
    return bless \%args, $class;
}

sub parse {
    my $self = shift;

    my $ResultArray = [];
    open my $fh, '<', $self->{filename} or die $!;

    # 1行ずつ読み込みますか
    while(my $line = <$fh>) {
        chomp $line;
        my @SplittedLine = split("\t",$line);

#        # 半古典的手法
#        my $ParamsHash = {};
#        foreach(@SplittedLine) { if($_ =~ /^(.+?):(.+)$/ && $2 ne '-') { $ParamsHash->{$1} = $2; } }

        # Skipすべきデータ <=> "値が-である" 
        # Slipするべき要素をgrepで弾いて残りをmapしてるけど同じ正規表現2回ってどうも知性が足りないような……
        my $ParamsHash = { map { $_ =~ /^(.+?):(.+)$/ && $1=>$2;} grep { $_ =~ /^(.+?):(.+)$/ && $2 ne '-'} @SplittedLine };

        push @$ResultArray, Log->new(%$ParamsHash);
    }

    return $ResultArray;
}

1;
